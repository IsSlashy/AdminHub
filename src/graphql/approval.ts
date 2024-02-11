import gql from 'graphql-tag';
export const VALIDE_DOCUMENT = gql`
  mutation ValideDoc($validedocument: ValidateDocumentInput!) {
    validateDocument(input: $validedocument) {
      clientMutationId
      document {
        id
        status
      }
    }
  }
`;

export const GENERATE_URL = gql`
  mutation MyMutation($keyInput: GeneratePresignedPostInput!) {
    generatePresignedPost(input: $keyInput) {
      url
      fields
    }
  }
`;
export const REFUSE_DOCUMENT = gql`
  mutation Mut($refuseinput: RefuseDocumentInput!) {
    refuseDocument(input: $refuseinput) {
      clientMutationId
      document {
        id
        status
      }
    }
  }
`;
export const GET_DEGREES = gql`
  query getTrainings($type: DocumentTypeEnum, $status: DocStatusEnum) {
    documents(condition: { type: $type, status: $status }, first: 100) {
      totalCount
      nodes {
        id
        createdAt
        expirationDate
        status
        documentUrl
        serial
        sailorId
        documentType {
          name
          category
          type
          id
        }
        user {
          id
          firstname
          birthday
          nativeLanguage {
            name
          }
          userDetailById {
            lastname
          }
        }
      }
    }
  }
`;

export const GET_TRAININGS = gql`
  query getTrainings($type: DocumentTypeEnum, $status: DocStatusEnum) {
    documents(condition: { type: $type, status: $status }, first: 100) {
      totalCount
      nodes {
        id
        createdAt
        expirationDate
        status
        documentUrl
        serial
        sailorId
        documentType {
          name
          category
          type
          id
        }
        user {
          id
          firstname
          birthday
          nativeLanguage {
            name
          }
          userDetailById {
            lastname
          }
        }
      }
    }
  }
`;
export const GET_RESUMES = gql`
  query CVQuery($status: ResumeStatusEnum) {
    resumes(
      orderBy: CREATED_AT_DESC
      condition: { status: $status }
      first: 100
    ) {
      totalCount
      nodes {
        id
        status
        url
        user {
          firstname
          id
          resumes {
            nodes {
              id
              status
              url
            }
          }
          userDetailById {
            lastname
          }
        }
      }
    }
  }
`;

export const GET_NO_RESUME = gql`
  query NoCV {
    users {
      nodes {
        id
        firstname
        preferredConnection
        userDetailById {
          lastname
        }
        resumes {
          totalCount
          nodes {
            status
          }
        }
      }
    }
  }
`;
export const GET_DOCUMENTS = gql`
  query MyQuery {
    documentTypes(orderBy: NAME_ASC) {
      nodes {
        name
        id
        country {
          name
          shortName
        }
      }
    }
  }
`;
export const UPDATE_DOCUMENT = gql`
  mutation update($documentInput: UpdateDocumentAdminInput!) {
    updateDocumentAdmin(input: $documentInput) {
      clientMutationId
      document {
        id
        type
        documentUrl
      }
    }
  }
`;
export const UPDATE_DETAILS = gql`
  mutation MyMutation($detailsInput: UpdateUserDetailInput!) {
    updateUserDetail(input: $detailsInput) {
      userDetail {
        id
        phoneNumber
        captnBoatApproved
        personnalSimpleAddress {
          id
          firstLine
          cityName
          zipcode
          country
        }
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($userinput: UpdateUserInput!) {
    updateUser(input: $userinput) {
      clientMutationId
    }
  }
`;

export const REFUSE_RESUME = gql`
  mutation mutation($inputresume: InvalidateResumeInput!) {
    invalidateResume(input: $inputresume) {
      resume {
        url
        id
      }
    }
  }
`;
export const ARCHIVE_DOCUMENT = gql`
  mutation MyMutation2($docInput: ArchiveDocumentInput!) {
    archiveDocument(input: $docInput) {
      document {
        documentType {
          id
          type
        }
      }
    }
  }
`;
export const VALIDE_RESUME = gql`
  mutation mutation($inputresume: ValidateResumeInput!) {
    validateResume(input: $inputresume) {
      resume {
        url
        id
      }
    }
  }
`;
export const DELETE_RESUME = gql`
  mutation mutation($inputresume: ArchiveResumeInput!) {
    archiveResume(input: $inputresume) {
      resume {
        url
        id
      }
    }
  }
`;
export const UPLOAD_RESUME = gql`
  mutation mutation($inputresume: CreateResumeInput!) {
    createResume(input: $inputresume) {
      resume {
        url
        status
      }
    }
  }
`;
