# Electronic Filing / Case Management System

### Build Status

#### develop

[![CircleCI](https://circleci.com/gh/flexion/ef-cms/tree/develop.svg?style=svg)](https://circleci.com/gh/flexion/ef-cms/tree/develop) 

#### staging

[![CircleCI](https://circleci.com/gh/ustaxcourt/ef-cms/tree/staging.svg?style=svg)](https://circleci.com/gh/ustaxcourt/ef-cms/tree/staging) 

API | Front-End | Shared Code
--- | --------- | -----------
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-api&metric=coverage)](https://sonarcloud.io/dashboard?id=ef-cms-api)<br>[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ef-cms-api)<br>[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-api&metric=security_rating)](https://sonarcloud.io/dashboard?id=ef-cms-api) | [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-front-end&metric=coverage)](https://sonarcloud.io/dashboard?id=ef-cms-front-end)<br>[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-front-end&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ef-cms-front-end)<br>[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-front-end&metric=security_rating)](https://sonarcloud.io/dashboard?id=ef-cms-front-end) | [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-shared&metric=coverage)](https://sonarcloud.io/dashboard?id=ef-cms-shared)<br>[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-shared&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=ef-cms-shared)<br>[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ef-cms-shared&metric=security_rating)](https://sonarcloud.io/dashboard?id=ef-cms-shared)

An as-yet-unnamed project by the [U.S. Tax Court](https://ustaxcourt.gov/), creating an open-source Electronic Filing / Case Management System (EF-CMS) — software that allows case documents to be filed with the court, and for the court to manage cases. Work is being done by [Flexion](https://www.flexion.us/), which began in October 2018. The output of the most recent biweekly sprint can be found [in the `staging` branch](https://github.com/ustaxcourt/ef-cms/tree/staging) of this repository, with daily work performed in [Flexion's fork of this repository](https://github.com/flexion/ef-cms/). For background, see [the RFQ to procure agile software development services](https://github.com/ustaxcourt/case-management-rfq), which was awarded to Flexion in September 2018.

<a href="docs/images/screenshot_new_petition.png"><img src="docs/images/screenshot_new_petition.png" width="32%" style="float: left; border: 2px solid #000; margin: 0 4px;" /></a>
<a href="docs/images/screenshot_petitioner.png"><img src="docs/images/screenshot_petitioner.png" width="32%" style="float: left;" /></a>
<a href="docs/images/screenshot_docket_record.png"><img src="docs/images/screenshot_docket_record.png" width="32%" style="float: left;" /></a>

The main fork of this project in which most development is occurring is located at [flexion ef-cms](https://github.com/flexion/ef-cms).
[Zenhub](https://www.zenhub.com/) can be used to view the project board to see the github issues.

Artifacts for on-going development such as designs, research data, user workflows etc. are located in the [wiki](https://github.com/flexion/ef-cms/wiki).

## Technical overview

This is a React-based Javascript application. It’s housed in a [monorepo](https://en.wikipedia.org/wiki/Monorepo) that contains the front end (`web-client/`) and the back end (`efcms-service/`), with a third project housing resources that are shared between the front and back ends (`shared/`). It’s architected for Amazon Web Services, with a strong reliance on [Lambda](https://aws.amazon.com/lambda/), scripted with Terraform. The project is heavily containerized, using Docker, and can be run locally, despite the serverless architecture. All CI/CD processes are found in `management/`. Deployment is done via a Jenkins server, and [that process is documented in `SETUP.md`](SETUP.md).

## Documentation

- There is a style guide available at http://localhost:1234/style-guide.
- The Javascript is marked up with [JSDoc](https://github.com/jsdoc3/jsdoc) comments, so documentation can be built by running `jsdoc -r .` locally.
- The API is documented via Swagger, and can be reviewed at http://localhost:3000/v1/swagger.
- The deployment process is documented in [`SETUP.md`](SETUP.md).
- The end-of-sprint code review process is documented in [`CODE_REVIEW.md`](CODE_REVIEW.md).
- A [glossary of terminology](https://github.com/flexion/ef-cms/wiki/Glossary) is found on Flexion's wiki.
- Flexion maintains [a collection of UX documentation](https://github.com/flexion/ef-cms/wiki/UX-Documentation), including [initial onsite user research](https://drive.google.com/open?id=1iapbWu6FFk6jWUdZyO_E4MUrwBpk0S9VCfhs_04yWJ0), [system user flows](https://www.lucidchart.com/invitations/accept/3548e4bf-2677-43ba-9707-c8ee797381eb), [user roles and permissions](https://docs.google.com/spreadsheets/d/1Hh7xMlnW87ospse50CWlwnGBrifrINeCyR2a8E--9wg/edit?usp=sharing), and a [content document](https://docs.google.com/spreadsheets/d/1lDbnSUwi85e-nQ7o1sNLpj2vzRFiTSeav5u3B3z_SZ4/edit?usp=sharing).

## AWS Diagram

<a href="docs/images/aws-diagram.png"><img src="docs/images/aws-diagram.png" style="border: 2px solid #000; " /></a>

## Backlog

The backlog is stored [in GitHub Issues in Flexion’s repository](https://github.com/flexion/ef-cms/issues), _not_ on this repository. Although they can be viewed like any other GitHub issues, they are managed on a scrum board that requires the [ZenHub browser plugin](https://www.zenhub.com/) to see.

## Building everything

To run the same checks that run in Jenkins (except SonarQube) locally, using Docker containers, run the following:

`./build-all.sh`

This will run the lint, Shellcheck, audit, build, test, Cypress, Cerebral tests, Pa11y, etc. over all the components.

## Running / verifing the project via Docker

Assuming you have Docker installed, the following command will spin up a Docker container with the UI, API, local S3, local Dynamo, etc. all running inside it:

`./docker-run.sh`

- You can access the UI at http://localhost:1234
- You can access the API at http://localhost:3000
- You can access the dynamodb shell at http://localhost:8000/shell
- You can access the dynamodb-admin ui at http://localhost:8001
- You can access s3 local at http://localhost:9000
- You can access the style guide at http://localhost:1234/style-guide

## Running this project locally without Docker

The EF-CMS is comprised of two components: the API and the UI. Both must be run in order to function.

### Prerequisites

- Node v8.10.0
- npm 6.4.1

### Setup

Both the web-client and efcms-service share code that exists in the `shared` directory; therefore, before you can run either, you need to run `npm install` inside the `shared` directory.

- `cd shared && npm i`
- `cd ../web-client && npm i`
- `cd ../efcms-service && npm i`

#### Terminal A

- `cd web-client && npm start`

#### Terminal B

- `cd efcms-service && npm start`

## Login and Test Users

There are two login mechanisms available — the legacy mock login system, and a new one that emulates AWS Cognito.

## Mock Login

You can log in using these usernames:

```
taxpayer
petitionsclerk
docketclerk
respondent
seniorattorney
```

No password is required.

## AWS Cognito 

To run use Cognito, start the web client with `npm run dev:cognito` (instead of `npm start`) You can then log in with:

```
petitioner1@example.com – petitioner5@example.com
petitionsclerk1@example.com – petitionsclerk5@example.com
docketclerk1@example.com – docketclerk5@example.com
respondent1@example.com – respondent5@example.com
seniorattorney1@example.com – seniorattorney5@example.com
```

The password for all accounts is:

`Testing1234$`

## CI/CD Setup

For instructions on how to build the DevOps pipeline and deploy the software to AWS, see [SETUP.md](SETUP.md).

## Editor configuration

### Atom.io

Install the following for best results:

- https://atom.io/packages/language-javascript-jsx
- https://atom.io/packages/language-groovy
- https://atom.io/packages/linter-eslint
- https://atom.io/packages/prettier-atom (enable ESLint and StyleLint integrations in settings)

## Using the application with Internet Explorer 11

If using Internet Explorer 11 with Windows 7, download the Adobe Reader application at https://get.adobe.com/reader/. Install as directed. This will permit PDFs to be viewed in-browser with Internet Explorer 11.

## Forked dependencies

The software has several dependencies that required minor modifications to suit our needs. Rather than attempt to persuade their creators to adopt our modifications, those repositories have been forked within the U.S. Tax Court's GitHub organization, and the modifications made there. Those repositories are:

- [serverless-s3-local](https://github.com/ustaxcourt/serverless-s3-local)
- [s3rver](https://github.com/ustaxcourt/s3rver)
- [serverless-plugin-bind-deployment-id](https://github.com/ustaxcourt/serverless-plugin-bind-deployment-id)

_If these repositories are deleted, the build will fail._ To verify that these repositories are still required, see each of the `package.json` files in the repo (e.g., `find . -name package.json -exec grep "github:ustaxcourt" {} \; |awk 'BEGIN {FS=": ";}{print$2}' |uniq`). Note that `s3rver` is a dependency of `serverless-s3-local`, and so it will not be found in our `package.json` files.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for additional information.

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.

## Sprint PRs

Follow these steps for creating the end of sprint PRs for the court.

1. Create a PR from develop -> staging
2. Verify PR passed
3. Merge PR and verify staging deployed correctly in Jenkins
4. Create a PR from staging -> master
5. Verify PR passed
6. Merge PR and verify prod deployed correctly in Jenkins
7. Create a PR from flexion/ef-cms master -> ustaxcourt/ef-cms staging
8. When PR comments come in, make changes to master to fix the comments
9. After the court approves and merges PR, merge master into develop
10. Create a release in GitHub as sprint_00x against master and put the same description planned to be in the PR description for the court


# Setup for CircleCI CI/CD Pipeline

## Prerequisites
- [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/).
- Create a `CircleCI` user in [AWS Identity and Access Management](https://console.aws.amazon.com/iam/):
     - Determine your organization’s AWS ID, a 12-digit number. While logged into the AWS Console, you can find this in the account menu in the top right, where it may appear with hyphens, e.g. `3503-6506-1526`.
     - In your local copy of the repository, generate an IAM policy with `./generate-policy.sh [YOUR_ACCOUNT_ID]`, e.g. `generate-policy.sh 350365061526`.
     - Create a IAM policy called `CircleCIPolicy`, populating it with the contents of the generated `policy.json`.
     - Create the `CircleCI` user and attach the policy.
     - Keep track of the access key and secret access key — it is needed for the CircleCI setup.
- [Create a Route53 Hosted Zone](https://console.aws.amazon.com/route53/home) This will be used for setting up the domains for the UI and API.  Put the desired domain name (e.g. `ef-cms.example.gov.`) and make sure it is a `Public Hosted Zone`.  This is the value you will set for `EFCMS_DOMAIN` in CircleCI.  Make sure the domain name ends with a period.
- [Create a SonarCloud account](https://sonarcloud.io/). SonarCloud will be used to tests each build.
- [Create a new SonarCloud organization](https://sonarcloud.io/create-organization).
  - There are three sub-projects to the EF-CMS — the front-end (the UI), the back-end (the API), and shared code. Each is handled separately by Jenkins and SonarCloud.
  - [Create a project and project key](https://sonarcloud.io/projects/create?manual=true) for the UI. (This will be referred to as `UI_SONAR_TOKEN` when setting up Jenkins.)
  - [Create a project and project key](https://sonarcloud.io/projects/create?manual=true) for the API. (This will be referred to as `API_SONAR_TOKEN` when setting up Jenkins.)
  - [Create a project and project key](https://sonarcloud.io/projects/create?manual=true) for the SHARED code. (This will be referred to as `SHARED_SONAR_TOKEN` when setting up Jenkins.)

## Circle CI Setup
1. Set up a [CircleCI](https://circleci.com/) account
2. Click "Add Projects"
3. Click "Set Up Project" next to the court's repo
4. Click "Start Building" with defaults
5. Go to the settings of the project in CircleCI via clicking on the project / job, and clicking the gear icon
6. Click "Environment Variables"
7. Add the following: 
     - `AWS_ACCESS_KEY_ID` (the access key for the AWS CircleCI user created in the Prerequisites)
     - `AWS_SECRET_ACCESS_KEY` (the secret access key for the AWS CircleCI user created in the Prerequisites)
     - `EFCMS_DOMAIN` (the domain indented for use by the court, e.g., `ef-cms.example.gov`)
     - `SONAR_ORG` (your sonar organization’s name)
     - `SHARED_SONAR_KEY` (the sonar key for the SHARED project)
     - `SHARED_SONAR_TOKEN` (the token for the sonar SHARED project)
     - `API_SONAR_KEY` (the sonar key for the API project)
     - `API_SONAR_TOKEN` (the token for the sonar API project)
     - `UI_SONAR_KEY` (the sonar key for the UI project)
     - `UI_SONAR_TOKEN` (the token for the sonar UI project)
     - `COGNITO_SUFFIX` (a suffix of your choice for the cognito url)
     - `USTC_ADMIN_PASS` (a unique password of your choice used by the cognito admin user)
8. Run a build.
