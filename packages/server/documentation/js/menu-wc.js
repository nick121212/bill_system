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
                    <a href="index.html" data-type="index-link">@bill/server documentation</a>
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
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-732f99241dfb4721dd191ebd673eef12c437db9350f5f3bab5c5a598466ab8c7d3ac737f0fe382d155789b09f7bc50c89c55fbca7786d86a08730f65f32f6a4e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-732f99241dfb4721dd191ebd673eef12c437db9350f5f3bab5c5a598466ab8c7d3ac737f0fe382d155789b09f7bc50c89c55fbca7786d86a08730f65f32f6a4e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-732f99241dfb4721dd191ebd673eef12c437db9350f5f3bab5c5a598466ab8c7d3ac737f0fe382d155789b09f7bc50c89c55fbca7786d86a08730f65f32f6a4e"' :
                                            'id="xs-controllers-links-module-AppModule-732f99241dfb4721dd191ebd673eef12c437db9350f5f3bab5c5a598466ab8c7d3ac737f0fe382d155789b09f7bc50c89c55fbca7786d86a08730f65f32f6a4e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' :
                                            'id="xs-controllers-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' :
                                        'id="xs-injectables-links-module-AuthModule-719f80a111fd039d2d38447ac84ae4328bb1a0e455e1ff05b19bbc78b454a5c282b921564b16805aab755e0e0c0f066e4434e068e3dc1ed3e6de3df8ce0d732c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/BcryptService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BcryptService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ChargeModule.html" data-type="entity-link" >ChargeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' : 'data-bs-target="#xs-controllers-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' :
                                            'id="xs-controllers-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' }>
                                            <li class="link">
                                                <a href="controllers/ChargeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChargeController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' : 'data-bs-target="#xs-injectables-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' :
                                        'id="xs-injectables-links-module-ChargeModule-c217f5e1be1805695a251daab9dfed08d32f0c8f0ea5da89c2eb1f9e346c3f7c2c6962f95f50c8caa60cf5324dd6ae6020eb8bb30a9bbfc8ef0e52ab25121456"' }>
                                        <li class="link">
                                            <a href="injectables/ChargeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ChargeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CompanyModule.html" data-type="entity-link" >CompanyModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' : 'data-bs-target="#xs-controllers-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' :
                                            'id="xs-controllers-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' }>
                                            <li class="link">
                                                <a href="controllers/CompanyController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' : 'data-bs-target="#xs-injectables-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' :
                                        'id="xs-injectables-links-module-CompanyModule-a7dd55a3b7cda8c9c973f5270a77a2ce0cbf07b97f7f9d8ca876b7866ff062e07f39659bcbcfd3832aacc9bd424269f7ba6743efa24c496b3210645675fc6a82"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CustomerModule.html" data-type="entity-link" >CustomerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' : 'data-bs-target="#xs-controllers-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' :
                                            'id="xs-controllers-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' }>
                                            <li class="link">
                                                <a href="controllers/CustomerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' : 'data-bs-target="#xs-injectables-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' :
                                        'id="xs-injectables-links-module-CustomerModule-f9c61ca00b6dfa513b1b1224ac3800881faf35519457eab4d18759c23be09cdfb70ef1423cf3cd48f8942cf57702b2e8bd0ea18fef294415022d8db4c3ff3632"' }>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/Log4jsGlobalModule.html" data-type="entity-link" >Log4jsGlobalModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-Log4jsGlobalModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' : 'data-bs-target="#xs-injectables-links-module-Log4jsGlobalModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-Log4jsGlobalModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' :
                                        'id="xs-injectables-links-module-Log4jsGlobalModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' }>
                                        <li class="link">
                                            <a href="injectables/Log4jsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Log4jsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/Log4jsModule.html" data-type="entity-link" >Log4jsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-Log4jsModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' : 'data-bs-target="#xs-injectables-links-module-Log4jsModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-Log4jsModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' :
                                        'id="xs-injectables-links-module-Log4jsModule-dfeb3fe41fab2647811ca51e77581510745a22c3ba58c1eff61fff1d892b7395af8178c9c0d2031a3aa32c197c6405ddcb32d62256126344e55689001b750d02"' }>
                                        <li class="link">
                                            <a href="injectables/Log4jsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Log4jsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MenuModule.html" data-type="entity-link" >MenuModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' : 'data-bs-target="#xs-controllers-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' :
                                            'id="xs-controllers-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' }>
                                            <li class="link">
                                                <a href="controllers/MenuController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' : 'data-bs-target="#xs-injectables-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' :
                                        'id="xs-injectables-links-module-MenuModule-7fd3e0a89bac6a00db6d5d2722f791aef0fee88ffe236bd73f8aaa9cc3a3200c71f089aa484a07248af87fe462f195b9beba009b6d2f6494ee0eee9221ce79df"' }>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrderModule.html" data-type="entity-link" >OrderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' :
                                            'id="xs-controllers-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' :
                                        'id="xs-injectables-links-module-OrderModule-eefe3265985bb321e1b533f68a90c5473f3c1c5fe108f6454b285d43703f1bf7364ae3f7c2d2ecf83b8bb59c547d6ba52419b71170f37a649c6b4505d11902e8"' }>
                                        <li class="link">
                                            <a href="injectables/OrderExportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderExportService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductUnitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductCategoryModule.html" data-type="entity-link" >ProductCategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' : 'data-bs-target="#xs-controllers-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' :
                                            'id="xs-controllers-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' }>
                                            <li class="link">
                                                <a href="controllers/ProductCategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' : 'data-bs-target="#xs-injectables-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' :
                                        'id="xs-injectables-links-module-ProductCategoryModule-73a2779f7b9233ad384dfc5bce13b58a29652c5a32a91807d44fc806d755803e421f3e6ca19cbea20879e5aafe3564160a85ed56a4c1d46bc55980222a0e63fb"' }>
                                        <li class="link">
                                            <a href="injectables/ProductCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' :
                                            'id="xs-controllers-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' :
                                        'id="xs-injectables-links-module-ProductModule-2d8271c66b17a1633566fd96e9bada1937dc062e7324dc02e14e2abe82a8c350f0935d7c055b601a157d6b097c596b6e17c8c7c993d5c5a4d8f2ce2da7478cd8"' }>
                                        <li class="link">
                                            <a href="injectables/ProductCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductUnitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductUnitModule.html" data-type="entity-link" >ProductUnitModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' : 'data-bs-target="#xs-controllers-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' :
                                            'id="xs-controllers-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' }>
                                            <li class="link">
                                                <a href="controllers/ProductUnitController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' : 'data-bs-target="#xs-injectables-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' :
                                        'id="xs-injectables-links-module-ProductUnitModule-fd04803fa2540d422ce32a88949c95a321eb597eb28ecdb22b776b9ac0b79c001d554911c40db413472889720a97ed869216b507c67661962bcf48f329a5b1e9"' }>
                                        <li class="link">
                                            <a href="injectables/ProductUnitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RedisModule-aa240e393b731eedf175f87285c4c3f3646e6bff6620979da590b997d598197d2fe7dd4db31da6521c063374f3b168bab32eb3ff977c6b2a2163c0a0e0df188b"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-aa240e393b731eedf175f87285c4c3f3646e6bff6620979da590b997d598197d2fe7dd4db31da6521c063374f3b168bab32eb3ff977c6b2a2163c0a0e0df188b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-aa240e393b731eedf175f87285c4c3f3646e6bff6620979da590b997d598197d2fe7dd4db31da6521c063374f3b168bab32eb3ff977c6b2a2163c0a0e0df188b"' :
                                        'id="xs-injectables-links-module-RedisModule-aa240e393b731eedf175f87285c4c3f3646e6bff6620979da590b997d598197d2fe7dd4db31da6521c063374f3b168bab32eb3ff977c6b2a2163c0a0e0df188b"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReportModule.html" data-type="entity-link" >ReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' : 'data-bs-target="#xs-controllers-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' :
                                            'id="xs-controllers-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' }>
                                            <li class="link">
                                                <a href="controllers/ReportController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' : 'data-bs-target="#xs-injectables-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' :
                                        'id="xs-injectables-links-module-ReportModule-6271be2851b2f17c9e9c6d6038a91aa6f682d0a6c2384e9dde5a7b39f1b000e27350e5ecffcff2620fa34fe33e875d98a0b6fe944e4429c0ebbe5a47424a2550"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReportService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ResetModule.html" data-type="entity-link" >ResetModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' : 'data-bs-target="#xs-controllers-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' :
                                            'id="xs-controllers-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' }>
                                            <li class="link">
                                                <a href="controllers/ResetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' : 'data-bs-target="#xs-injectables-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' :
                                        'id="xs-injectables-links-module-ResetModule-6076ced07dfdd464188f606c2f6406407ba9cebb177fb8d2d19d952789d763fa62205345ba538f2df2f4ec313e07732e52e1157e7073b838f12cb2105fd449df"' }>
                                        <li class="link">
                                            <a href="injectables/ResetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' : 'data-bs-target="#xs-controllers-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' :
                                            'id="xs-controllers-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' }>
                                            <li class="link">
                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' : 'data-bs-target="#xs-injectables-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' :
                                        'id="xs-injectables-links-module-RoleModule-1d8cee3a8924431be69d5462fc4212c7093120ceb356fde5876480162b37ed5fe153b6d58f8c011487c38d0a58cae548af0f59d539aea73ac32a0904f03aefff"' }>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatisticsModule.html" data-type="entity-link" >StatisticsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' : 'data-bs-target="#xs-controllers-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' :
                                            'id="xs-controllers-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' }>
                                            <li class="link">
                                                <a href="controllers/StatisticsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' : 'data-bs-target="#xs-injectables-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' :
                                        'id="xs-injectables-links-module-StatisticsModule-5f392949836e6fdade27154e0ad3db3e21c403407119794a454935300b26019ec1a4e0f35383d6f7f69e99285809265268b6fbefdeadbe31a05ef56ecf7879fa"' }>
                                        <li class="link">
                                            <a href="injectables/StatisticsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatisticsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplateModule.html" data-type="entity-link" >TemplateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' : 'data-bs-target="#xs-controllers-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' :
                                            'id="xs-controllers-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' }>
                                            <li class="link">
                                                <a href="controllers/MenuController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' : 'data-bs-target="#xs-injectables-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' :
                                        'id="xs-injectables-links-module-TemplateModule-169f8e3a69f5e61fe5d1ed2543c0335eeadcc20b382fe2109baa33b6579bf91870007945e8db494275e0b8f8fcca4f3daffdc080ab635042d11f2328afd9d8b1"' }>
                                        <li class="link">
                                            <a href="injectables/ProductCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCategoryService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductUnitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TemplateService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemplateService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' : 'data-bs-target="#xs-controllers-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' :
                                            'id="xs-controllers-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' : 'data-bs-target="#xs-injectables-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' :
                                        'id="xs-injectables-links-module-UserModule-ec515e528ee79d7bc1f66d0ca22c7901cc0a3005fd09169f681250ea10a1c131613576ae76d69aa6d916929149412f7c3f540956e17915fbae61ceae0e314666"' }>
                                        <li class="link">
                                            <a href="injectables/CompanyService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CompanyService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiException.html" data-type="entity-link" >ApiException</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRequest.html" data-type="entity-link" >AuthRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseQuery.html" data-type="entity-link" >BaseQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChargeQuery.html" data-type="entity-link" >ChargeQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChargeRequest.html" data-type="entity-link" >ChargeRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChargeSearchModel.html" data-type="entity-link" >ChargeSearchModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompanyQuery.html" data-type="entity-link" >CompanyQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompanyRequest.html" data-type="entity-link" >CompanyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerPrice.html" data-type="entity-link" >CustomerPrice</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerPriceRequest.html" data-type="entity-link" >CustomerPriceRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerQuery.html" data-type="entity-link" >CustomerQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerRequest.html" data-type="entity-link" >CustomerRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerWhere.html" data-type="entity-link" >CustomerWhere</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariables.html" data-type="entity-link" >EnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/MatchConstraint.html" data-type="entity-link" >MatchConstraint</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuBodyRequest.html" data-type="entity-link" >MenuBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderCategory.html" data-type="entity-link" >OrderCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderExportRequest.html" data-type="entity-link" >OrderExportRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderProduct.html" data-type="entity-link" >OrderProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderQuery.html" data-type="entity-link" >OrderQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderRequest.html" data-type="entity-link" >OrderRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderStatusRequest.html" data-type="entity-link" >OrderStatusRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderWhere.html" data-type="entity-link" >OrderWhere</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductBodyRequest.html" data-type="entity-link" >ProductBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategoryProductQuery.html" data-type="entity-link" >ProductCategoryProductQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategoryProductWhere.html" data-type="entity-link" >ProductCategoryProductWhere</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategoryQuery.html" data-type="entity-link" >ProductCategoryQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductCategoryRequest.html" data-type="entity-link" >ProductCategoryRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductQuery.html" data-type="entity-link" >ProductQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductUnitBodyRequest.html" data-type="entity-link" >ProductUnitBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductUnitQuery.html" data-type="entity-link" >ProductUnitQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductUnitQueryWhere.html" data-type="entity-link" >ProductUnitQueryWhere</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportQuery.html" data-type="entity-link" >ReportQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportRequest.html" data-type="entity-link" >ReportRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReportSearchModel.html" data-type="entity-link" >ReportSearchModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleQuery.html" data-type="entity-link" >RoleQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleQuery-1.html" data-type="entity-link" >RoleQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleRequest.html" data-type="entity-link" >RoleRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleRequest-1.html" data-type="entity-link" >RoleRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatisticsQuery.html" data-type="entity-link" >StatisticsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatisticsRequest.html" data-type="entity-link" >StatisticsRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/StatisticsWhere.html" data-type="entity-link" >StatisticsWhere</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateBodyRequest.html" data-type="entity-link" >TemplateBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateCategory.html" data-type="entity-link" >TemplateCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateCategoryProduct.html" data-type="entity-link" >TemplateCategoryProduct</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateQuery.html" data-type="entity-link" >TemplateQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPasswordRequest.html" data-type="entity-link" >UserPasswordRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserQuery.html" data-type="entity-link" >UserQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRequest.html" data-type="entity-link" >UserRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSearchModel.html" data-type="entity-link" >UserSearchModel</a>
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
                                    <a href="injectables/FileSizeValidationPipe.html" data-type="entity-link" >FileSizeValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
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
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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