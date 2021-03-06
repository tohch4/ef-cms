const client = require('../../dynamodbClientService');
const sinon = require('sinon');
const { getSentWorkItemsForSection } = require('./getSentWorkItemsForSection');

const MOCK_ITEM = {
  docketNumber: '123-19',
  status: 'New',
};

describe('getSentWorkItemsForSection', () => {
  let getStub;

  beforeEach(() => {
    getStub = sinon.stub().returns({
      promise: () =>
        Promise.resolve({
          Item: {
            'aws:rep:deleting': 'a',
            'aws:rep:updateregion': 'b',
            'aws:rep:updatetime': 'c',
            ...MOCK_ITEM,
          },
        }),
    });

    sinon.stub(client, 'query').resolves([
      {
        pk: 'abc',
        sk: 'abc',
        workItemId: 'abc',
      },
    ]);
    sinon.stub(client, 'batchGet').resolves([
      {
        pk: 'abc',
        sk: 'abc',
        workItemId: 'abc',
      },
    ]);
    sinon
      .stub(window.Date.prototype, 'toISOString')
      .returns('2019-01-23T00:00:00Z');
  });

  afterEach(() => {
    client.query.restore();
    client.batchGet.restore();
    window.Date.prototype.toISOString.restore();
  });

  it('invokes the peristence layer with pk of petitions|outbox and other expected params', async () => {
    const applicationContext = {
      environment: {
        stage: 'dev',
      },
      getDocumentClient: () => ({
        get: getStub,
      }),
      isAuthorizedForWorkItems: () => {
        return true;
      },
    };
    await getSentWorkItemsForSection({
      applicationContext,
      section: 'petitions',
    });
    expect(client.query.getCall(0).args[0]).toMatchObject({
      ExpressionAttributeNames: { '#pk': 'pk', '#sk': 'sk' },
      ExpressionAttributeValues: {
        ':afterDate': '2019-01-16T00:00:00Z',
        ':pk': 'section-outbox-petitions',
      },
      KeyConditionExpression: '#pk = :pk AND #sk >= :afterDate',
      applicationContext: { environment: { stage: 'dev' } },
    });
  });
});
