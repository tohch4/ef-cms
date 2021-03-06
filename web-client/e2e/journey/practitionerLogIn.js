import { applicationContext } from '../../src/applicationContext';

export default test => {
  return it('Practitioner logs in', async () => {
    await test.runSequence('updateFormValueSequence', {
      key: 'name',
      value: 'practitioner',
    });
    await test.runSequence('submitLoginSequence');
    expect(test.getState('user.userId')).toEqual(
      '9805d1ab-18d0-43ec-bafb-654e83405416',
    );
    expect(applicationContext.getCurrentUser()).toBeDefined();
    expect(applicationContext.getCurrentUser().userId).toEqual(
      '9805d1ab-18d0-43ec-bafb-654e83405416',
    );
  });
};
