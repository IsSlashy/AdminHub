var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[],"kind":"module"},{"name":"routes","filename":"src/app/admin/admin-routing.module.ts","module":"AdminRoutingModule","children":[{"path":"","redirectTo":"connection","pathMatch":"full"},{"path":"connection","component":"ConnectionComponent"},{"path":"admin","component":"AdminComponent","children":[{"path":"","redirectTo":"dashboard","pathMatch":"full"},{"path":"dashboard","component":"DashboardComponent","children":[{"path":"","redirectTo":"statistiques","pathMatch":"full"},{"path":"statistiques","component":"StatistiquesComponent"},{"path":"jobs","component":"JobsComponent"},{"path":"devis","component":"DevisComponent"},{"path":"alert-document","component":"AlertDocumentComponent"},{"path":"profil/:id","component":"ProfilComponent"}]},{"path":"approval","component":"ApprovalComponent","children":[{"path":"","redirectTo":"degree","pathMatch":"full"},{"path":"degree","component":"DegreesComponent"},{"path":"training","component":"TrainingsComponent"},{"path":"resume","component":"ResumesComponent"}]},{"path":"management","component":"ManagementComponent"},{"path":"chess","component":"ChessComponent"},{"path":"chat","component":"ChatComponent"},{"path":"follow-up","component":"FollowUpComponent"},{"path":"search-mission","component":"SearchMissionComponent"},{"path":"notations","component":"NotationsComponent"},{"path":"notation/:id","component":"NotationComponent"},{"path":"data","component":"DataComponent","children":[{"path":"","redirectTo":"variables","pathMatch":"full"},{"path":"port","component":"HarborComponent"},{"path":"variables","component":"VariablesComponent"},{"path":"model","component":"ModelComponent"}]},{"path":"creation","component":"CreationComponent","children":[{"path":"","redirectTo":"complete-job","pathMatch":"full"},{"path":"complete-job","component":"NewCompleteJobComponent"},{"path":"job","component":"NewJobComponent"},{"path":"offer","component":"NewOfferComponent"},{"path":"boat/:id","component":"NewBoatComponent"}]},{"path":"chess/:id","component":"DetailComponent"},{"path":"boat/:id","component":"BoatComponent"},{"path":"offer/:id","component":"OfferComponent"},{"path":"job/:id","component":"JobComponent","children":[{"path":"","redirectTo":"info","pathMatch":"full"},{"path":"info","component":"InfoComponent"},{"path":"billing","component":"BillingComponent"},{"path":"matching","component":"MatchingComponent"},{"path":"offers","component":"OffersComponent"}]},{"path":"sailor/:id","component":"SailorComponent","children":[{"path":"","redirectTo":"profil","pathMatch":"full"},{"path":"profil","component":"ProfilComponent"},{"path":"documents","component":"DocumentsComponent"},{"path":"perso","component":"PersonalComponent"},{"path":"jobs","component":"SailorJobsComponent"},{"path":"finance","component":"FinanceComponent"},{"path":"settings","component":"SettingsComponent"},{"path":"favoris","component":"FavorisComponent"}]},{"path":"client/:id","component":"ClientComponent","children":[{"path":"","redirectTo":"profil","pathMatch":"full"},{"path":"profil","component":"ClientPersonalComponent"},{"path":"boats","component":"BoatsComponent"},{"path":"jobs","component":"ClientJobsComponent"},{"path":"paiments","component":"PaimentsComponent"},{"path":"settings","component":"SettingsComponent"},{"path":"favoris","component":"FavorisComponent"}]}],"canActivate":["AuthGuard"]}],"kind":"module"}]}