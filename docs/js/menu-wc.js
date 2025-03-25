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
                    <a href="index.html" data-type="index-link">bill_system documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
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
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' :
                                            'id="xs-controllers-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' :
                                        'id="xs-injectables-links-module-AuthModule-90e2fc982a91c2f4b9373f5b59a91ec648ca91a805566ac45df2d9a5956e11cd12e6403966e63820e90c2c2b2b16424fff16fd5f4c9abfe6e0e834f6549119b0"' }>
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
                                            'data-bs-target="#controllers-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' : 'data-bs-target="#xs-controllers-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' :
                                            'id="xs-controllers-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' }>
                                            <li class="link">
                                                <a href="controllers/CustomerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' : 'data-bs-target="#xs-injectables-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' :
                                        'id="xs-injectables-links-module-CustomerModule-1f56a4681319bed096e43ff3e34bf81d1ff51f472183c85153e73d63275ec1eeb3aabdff5b9ce23c2e1f86fbf14c10be7696944148b0ed2ea9c14282573d428e"' }>
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
                                            'data-bs-target="#controllers-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' : 'data-bs-target="#xs-controllers-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' :
                                            'id="xs-controllers-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' }>
                                            <li class="link">
                                                <a href="controllers/OrderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' : 'data-bs-target="#xs-injectables-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' :
                                        'id="xs-injectables-links-module-OrderModule-38193bf24f6a7e67dc5e742beb1222afa9d24fab143a2a7c1ec136ebbfb0b7684a5d21ab83ec0cf040c5f785bd4f5d5515cb8ffed7cb9650197adda5cc18c246"' }>
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
                                            'data-bs-target="#controllers-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' : 'data-bs-target="#xs-controllers-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' :
                                            'id="xs-controllers-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' : 'data-bs-target="#xs-injectables-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' :
                                        'id="xs-injectables-links-module-ProductModule-b2350d016bcfbe60dbb10874a9fe120a8bf032e309afea27226f0d477b156a5f54ccb262a63f50590538f81fe0f230dc4282280fc60da24dde46e6c3d52b82cf"' }>
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
                                            'data-bs-target="#controllers-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' : 'data-bs-target="#xs-controllers-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' :
                                            'id="xs-controllers-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' }>
                                            <li class="link">
                                                <a href="controllers/ProductUnitController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductUnitController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' : 'data-bs-target="#xs-injectables-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' :
                                        'id="xs-injectables-links-module-ProductUnitModule-a2abe8128dbd68e94011feed9c6178827b1306ad21eb5c0f412c6b8c1b4eb5b7cc9caca8ff1ba30ecef1c6001abf3472873de06474ac94656acdb5e90168bbed"' }>
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
                                        'data-bs-target="#injectables-links-module-RedisModule-9055159214d8cc7f6bf73fca54a4ed9bed1299d544bf506adfcd3eff9c190cc9929bf0957e740621cdaab691c381ccddd0b1d6b5041ccbf0a93626b76a1b9dd4"' : 'data-bs-target="#xs-injectables-links-module-RedisModule-9055159214d8cc7f6bf73fca54a4ed9bed1299d544bf506adfcd3eff9c190cc9929bf0957e740621cdaab691c381ccddd0b1d6b5041ccbf0a93626b76a1b9dd4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-9055159214d8cc7f6bf73fca54a4ed9bed1299d544bf506adfcd3eff9c190cc9929bf0957e740621cdaab691c381ccddd0b1d6b5041ccbf0a93626b76a1b9dd4"' :
                                        'id="xs-injectables-links-module-RedisModule-9055159214d8cc7f6bf73fca54a4ed9bed1299d544bf506adfcd3eff9c190cc9929bf0957e740621cdaab691c381ccddd0b1d6b5041ccbf0a93626b76a1b9dd4"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
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
                                            'data-bs-target="#controllers-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' : 'data-bs-target="#xs-controllers-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' :
                                            'id="xs-controllers-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' : 'data-bs-target="#xs-injectables-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' :
                                        'id="xs-injectables-links-module-UserModule-b311272f534fbfbfe8cad7690984e9165b2557b68d73ca48c2e0a636c0bb6b2070f201332f89145dfaf8224c9bb4144c2bf68fb84ef74de070e5ac6af2c461c8"' }>
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
                                <a href="classes/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleQuery.html" data-type="entity-link" >RoleQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/RoleRequest.html" data-type="entity-link" >RoleRequest</a>
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
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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