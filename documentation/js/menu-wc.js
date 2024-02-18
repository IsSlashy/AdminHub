'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">admin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' : 'data-bs-target="#xs-components-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' :
                                            'id="xs-components-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AlertDocumentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AlertDocumentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BillingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BillingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BoatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BoatsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BoatsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChessComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientJobsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientJobsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ClientPersonalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClientPersonalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConnectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConnectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DegreesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DegreesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DevisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DevisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavorisComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavorisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FinanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FinanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FollowUpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FollowUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HarborComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HarborComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JobComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JobsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JobsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagementComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagementComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MatchingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MatchingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewBoatComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewBoatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCompleteJobComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCompleteJobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewJobComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewJobComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewOfferComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewOfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfferComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OffersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OffersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaimentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaimentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PersonalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersonalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResumesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResumesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SailorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SailorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SailorJobsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SailorJobsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StatistiquesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatistiquesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TrainingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TrainingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VariablesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VariablesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' : 'data-bs-target="#xs-pipes-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' :
                                            'id="xs-pipes-links-module-AdminModule-a1cdc0236596b4386551df16d39fcab70b1f429996aadc01979e7a48d1f219f908c90ff28d1e22baad4b84caa5cfa2f746f3f00bd672c5cef2a3f9d39d83fa0d"' }>
                                            <li class="link">
                                                <a href="pipes/FilterPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FilterPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-e7af419628f1b887bc47d92736fcfe2d05ef07e5664fb0df25c266c23dfe0a57e795beaf5d44cd9e2b177d0ade0116cc35d6211ca68520176cfe35eb4b8e28b6"' : 'data-bs-target="#xs-components-links-module-AppModule-e7af419628f1b887bc47d92736fcfe2d05ef07e5664fb0df25c266c23dfe0a57e795beaf5d44cd9e2b177d0ade0116cc35d6211ca68520176cfe35eb4b8e28b6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e7af419628f1b887bc47d92736fcfe2d05ef07e5664fb0df25c266c23dfe0a57e795beaf5d44cd9e2b177d0ade0116cc35d6211ca68520176cfe35eb4b8e28b6"' :
                                            'id="xs-components-links-module-AppModule-e7af419628f1b887bc47d92736fcfe2d05ef07e5664fb0df25c266c23dfe0a57e795beaf5d44cd9e2b177d0ade0116cc35d6211ca68520176cfe35eb4b8e28b6"' }>
                                            <li class="link">
                                                <a href="components/AdminPlusComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminPlusComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApprovalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApprovalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/KPIComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >KPIComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchMissionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchMissionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchSkipperComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchSkipperComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ComponentsModule-85452ef2505e830396fb53264b56d10ea98b1e0c0635f3a521a297261b59d73756960094c2b500994d8be736ed8db1a5eb8a5874f602d0fc4567658d471b1650"' : 'data-bs-target="#xs-components-links-module-ComponentsModule-85452ef2505e830396fb53264b56d10ea98b1e0c0635f3a521a297261b59d73756960094c2b500994d8be736ed8db1a5eb8a5874f602d0fc4567658d471b1650"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-85452ef2505e830396fb53264b56d10ea98b1e0c0635f3a521a297261b59d73756960094c2b500994d8be736ed8db1a5eb8a5874f602d0fc4567658d471b1650"' :
                                            'id="xs-components-links-module-ComponentsModule-85452ef2505e830396fb53264b56d10ea98b1e0c0635f3a521a297261b59d73756960094c2b500994d8be736ed8db1a5eb8a5874f602d0fc4567658d471b1650"' }>
                                            <li class="link">
                                                <a href="components/AutocompleteHarborComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutocompleteHarborComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AutocompleteModelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutocompleteModelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AutocompletePlaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AutocompletePlaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CalculesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CalculesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GooglePlacesAutocompleteComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GooglePlacesAutocompleteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalAssigneOfferComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalAssigneOfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalConfirmedComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalConfirmedComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GraphQLModule.html" data-type="entity-link" >GraphQLModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AquaplotService.html" data-type="entity-link" >AquaplotService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataServiceService.html" data-type="entity-link" >DataServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GraphqlService.html" data-type="entity-link" >GraphqlService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PortService.html" data-type="entity-link" >PortService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddressData.html" data-type="entity-link" >AddressData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressData-1.html" data-type="entity-link" >AddressData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AddressData-2.html" data-type="entity-link" >AddressData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocType.html" data-type="entity-link" >DocType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MarinFavori.html" data-type="entity-link" >MarinFavori</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Port.html" data-type="entity-link" >Port</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-1.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User-2.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});