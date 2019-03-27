const {
  joiValidationDecorator,
} = require('../../utilities/JoiValidationDecorator');

const joi = require('joi-browser');

/**
 *
 * @param rawPetition
 * @constructor
 */
function PetitionFromPaperWithoutFiles(rawPetition) {
  Object.assign(this, rawPetition);
}

PetitionFromPaperWithoutFiles.errorToMessageMap = {
  caseCaption: 'Case Caption is required.',
  createdAt: [
    {
      contains: 'must be less than or equal to',
      message: 'The received date is in the future. Please enter a valid date.',
    },
    'Please enter a valid date.',
  ],
  petitionFileId: 'A petition file id is required.',
};

const uuidVersions = {
  version: ['uuidv4'],
};

const paperRequirements = joi.object().keys({
  caseCaption: joi.string().required(),
  createdAt: joi
    .date()
    .iso()
    .max('now')
    .required(),
  petitionFileId: joi
    .string()
    .uuid(uuidVersions)
    .required(),
});

joiValidationDecorator(
  PetitionFromPaperWithoutFiles,
  paperRequirements,
  function() {
    return !this.getFormattedValidationErrors();
  },
  PetitionFromPaperWithoutFiles.errorToMessageMap,
);

module.exports = { PetitionFromPaperWithoutFiles };