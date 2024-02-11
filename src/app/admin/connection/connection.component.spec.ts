import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionComponent } from './connection.component';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

describe('ConnectionComponent', () => {
  let component: ConnectionComponent;
  let fixture: ComponentFixture<ConnectionComponent>;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionComponent],
      imports: [ApolloTestingModule],
      providers: [Apollo],
    });
    fixture = TestBed.createComponent(ConnectionComponent);
    component = fixture.componentInstance;
    controller = TestBed.inject(ApolloTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run login mutation', () => {
    component.email = 'test@gmail.com';
    component.password = 'test';

    const loginMutation = gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            id
            email
          }
        }
      }
    `;

    component.connect();

    const op = controller.expectOne(loginMutation);

    op.flush({
      data: {
        login: {
          token: 'test-token',
          user: {
            id: '1',
            username: 'testuser',
          },
        },
      },
    });

    expect(op.operation.variables['email']).toEqual('test@gmail.com');
    expect(op.operation.variables['password']).toEqual('testpass');
  });
});
