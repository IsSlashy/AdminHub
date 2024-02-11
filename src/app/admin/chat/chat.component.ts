import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {
  ADMIN_CONVERSATIONS,
  ADMIN_CONVERSATION,
  SUBSCRIPTION_MESSAGE,
  ADMIN_MAIL_OFFER,
  SEND_MESSAGE_ADMIN,
  ARCHIVE,
  ARCHIVE_MESSAGE,
  CANCEL_APPLICATION,
} from 'src/graphql/chat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  conversationsQuery!: QueryRef<any>;
  conversationQuery!: QueryRef<any>;
  private conversationSubscription!: Subscription;

  conversations: any = new Array<any>();
  conversation: any;
  chatId: string = 'cb8c8591-8ab3-4e63-a0d9-f1a8b32b98ff';
  messageForm = new FormControl();
  commercials: any = new Array<any>();

  jobLanguages: any = new Array<any>();
  sailorLanguages: any = new Array<any>();

  searchForm: FormGroup = this.formBuilder.group({
    pJobId: [null, []],
    pUserId: [null, []],
    pJobStatus: [null, []],
    pCommercial: [null, []],
    first: [20, []],
    offset: [0, []],
  });

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchForm.patchValue({
        pJobId: params.get('jobId'),
        pUserId: params.get('userId'),
        pJobStatus: params.get('jobStatus'),
        pCommercial: params.get('commercial'),
      });

      this.conversationsQuery = this.apollo.watchQuery({
        query: ADMIN_CONVERSATIONS,
        variables: this.searchForm.value,
      });

      this.conversationsQuery.valueChanges.subscribe(({ data }: any) => {
        this.conversations = data.conversationsAdmin.nodes;
        this.commercials = data.commercials.nodes;
      });
    });

    this.conversationQuery = this.apollo.watchQuery<any>({
      query: ADMIN_CONVERSATION,
      variables: {
        conversationInput: this.chatId,
      },
    });
    this.conversationQuery.valueChanges.subscribe(({ data }: any) => {
      this.conversation = data?.conversation;
      this.sailorLanguages =
        data.conversation?.sailor.sailorSpokenLanguages.nodes.map(
          (elt: any) => elt.language.isoCode
        );
      this.jobLanguages =
        data.conversation?.job.ad.spokenLanguagesByAdsId.nodes.map(
          (elt: any) => elt.language.isoCode
        );
    });

    this.conversationQuery.subscribeToMore({
      document: SUBSCRIPTION_MESSAGE,
      updateQuery(prev, { subscriptionData }) {
        if (!subscriptionData.data) {
          return prev;
        }
        const newMessage = subscriptionData.data.messageSent.message;
        const mesgList = [...prev.conversation.messagesList, newMessage];
        return {
          ...prev,
          conversation: {
            messagesList: [mesgList],
          },
        };
      },
    });
  }

  openUser(userId: string, userType: string) {
    const url = this.router.createUrlTree([
      '/admin/' + userType + '/' + userId + '/profil',
    ]);
    window.open(url.toString());
  }
  openDetailJob(idAdvert: string) {
    const url = this.router.createUrlTree(['/admin/job/' + idAdvert + 'info']);
    window.open(url.toString());
  }

  loadChat(chatId: string) {
    console.log('le chat ', chatId);
    if (!chatId) {
      return;
    }
    this.chatId = chatId;
    this.conversationQuery.refetch({
      conversationInput: this.chatId,
    });
  }

  sendOffer(message: any) {
    this.apollo
      .query({
        query: ADMIN_MAIL_OFFER,
        variables: {
          pConvId: message.conversationId,
          pOfferId: message.offer.id,
        },
      })
      .subscribe(({ data, loading }: any) => {
        console.log(data);
      });
  }

  sendMessage(admin: boolean) {
    this.apollo
      .mutate({
        mutation: SEND_MESSAGE_ADMIN,
        variables: {
          newmessage: {
            pJobId: this.conversation.job.id,
            pSailorId: this.conversation.sailor.id,
            pContent: this.messageForm.value,
            isAdmin: admin,
          },
        },
        update: (store, { data: { sendMessageAdmin } }: any) => {
          // Read the data from our cache for this query.
          const data: any = store.readQuery({
            query: ADMIN_CONVERSATION,
            variables: {
              conversationInput: this.conversation.id,
            },
          });
          const conv = {
            conversation: {
              ...data.conversation,
              messagesList: [
                ...data.conversation.messagesList,
                sendMessageAdmin.message,
              ],
            },
          };
          this.conversation = { ...conv.conversation };
          this.conversation.messagesList = [
            ...data.conversation.messagesList,
            sendMessageAdmin.message,
          ];
          store.writeQuery({
            query: ADMIN_CONVERSATION,
            variables: {
              conversationInput: this.conversation.id,
            },
            data: {
              conversation: {
                ...data.conversation,
                messagesList: [
                  ...data.conversation.messagesList,
                  sendMessageAdmin.message,
                ],
              },
            },
          });
        },
      })
      .subscribe(({ data, loading }: any) => {
        this.messageForm.reset();
      });
  }

  // ARCHIVE MESSAGE
  deleteMessage(idMessage: string) {
    this.apollo
      .mutate({
        mutation: ARCHIVE_MESSAGE,
        variables: {
          deleteInput: {
            pMessageId: idMessage,
          },
        },
        refetchQueries: [
          {
            query: ADMIN_CONVERSATION,
            variables: { conversationInput: this.conversation.id },
          },
        ],
      })
      .subscribe(({ data, loading }: any) => {});
  }

  cancelOffer(offerId: string) {
    this.apollo
      .mutate({
        mutation: CANCEL_APPLICATION,
        variables: {
          cancelOfferInput: {
            pOfferId: offerId,
          },
        },
        refetchQueries: [
          {
            query: ADMIN_CONVERSATION,
            variables: { conversationInput: this.conversation.id },
          },
        ],
      })
      .subscribe(({ data }: any) => {});
  }

  archiveConv(convId: string, userId: string) {
    this.apollo
      .mutate({
        mutation: ARCHIVE,
        variables: {
          convId: {
            conversationId: convId,
            userId: userId,
          },
        },
        refetchQueries: [
          {
            query: ADMIN_CONVERSATION,
            variables: { conversationInput: this.chatId },
          },
        ],
      })
      .subscribe(({ data }: any) => {});
  }

  loadConv() {
    const first = this.searchForm.value.first + 20;
    this.searchForm.patchValue({ first: first });
    this.conversationsQuery.refetch(this.searchForm.value);
  }

  search() {
    this.conversationsQuery.refetch(this.searchForm.value);
  }
  openCv(cv: any) {
    window.open(cv.resumes.nodes[0].url);
  }
}
