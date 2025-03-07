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
                                            'data-bs-target="#controllers-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' :
                                            'id="xs-controllers-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' :
                                        'id="xs-injectables-links-module-AuthModule-ef0da15d10b2aea0b301381893079b6e00804317e43025c6e7b24eb8c57c086b392c085bd38add1c22ed871f6a91e395d70a31392c26515c92511ada41204391"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/Log4jsGlobalModule.html" data-type="entity-link" >Log4jsGlobalModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-Log4jsGlobalModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' : 'data-bs-target="#xs-injectables-links-module-Log4jsGlobalModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-Log4jsGlobalModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' :
                                        'id="xs-injectables-links-module-Log4jsGlobalModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' }>
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
                                        'data-bs-target="#injectables-links-module-Log4jsModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' : 'data-bs-target="#xs-injectables-links-module-Log4jsModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-Log4jsModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' :
                                        'id="xs-injectables-links-module-Log4jsModule-292428cfacdb25b8c18c71246fe9886bd4f672485ac3eb6c6bbd493b44a1492bfbfec266753b6088255df247d09e3790879cae36f427a4b0c304b12b2e256bb3"' }>
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
                                            'data-bs-target="#controllers-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' : 'data-bs-target="#xs-controllers-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' :
                                            'id="xs-controllers-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' }>
                                            <li class="link">
                                                <a href="controllers/MenuController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' : 'data-bs-target="#xs-injectables-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' :
                                        'id="xs-injectables-links-module-MenuModule-89e6830a3cf5e2f7e4d8da9c734507b3fb246c6ca0e2cf2db5f3f83b3d3fbf06a2582694689aed6c918aef5048e735c34fc0e65d543fd61f46995f6b4a1aaf67"' }>
                                        <li class="link">
                                            <a href="injectables/MenuService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TemplateModule.html" data-type="entity-link" >TemplateModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' : 'data-bs-target="#xs-controllers-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' :
                                            'id="xs-controllers-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' }>
                                            <li class="link">
                                                <a href="controllers/MenuController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' : 'data-bs-target="#xs-injectables-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' :
                                        'id="xs-injectables-links-module-TemplateModule-b9f4ec84e66b0b3b2addcf3f9b80fa07f27afc0ed493e19264e9b2c1273f114f936025d527b8667ebb31a4e170e3fb88d80cbc9683f570ca9fbd2d0d0917b7b4"' }>
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
                                        'data-bs-target="#injectables-links-module-UserModule-d63287bfc3ea6deb12aa6790cadb080ff47209e307a50ce176ef5d1fe3b9167981e1ab260dd22ba3228ffdce805f1b57ae21d390566a0930b6027aec477cc2c5"' : 'data-bs-target="#xs-injectables-links-module-UserModule-d63287bfc3ea6deb12aa6790cadb080ff47209e307a50ce176ef5d1fe3b9167981e1ab260dd22ba3228ffdce805f1b57ae21d390566a0930b6027aec477cc2c5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-d63287bfc3ea6deb12aa6790cadb080ff47209e307a50ce176ef5d1fe3b9167981e1ab260dd22ba3228ffdce805f1b57ae21d390566a0930b6027aec477cc2c5"' :
                                        'id="xs-injectables-links-module-UserModule-d63287bfc3ea6deb12aa6790cadb080ff47209e307a50ce176ef5d1fe3b9167981e1ab260dd22ba3228ffdce805f1b57ae21d390566a0930b6027aec477cc2c5"' }>
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
                                <a href="classes/BaseQuery.html" data-type="entity-link" >BaseQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/MenuBodyRequest.html" data-type="entity-link" >MenuBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateBodyRequest.html" data-type="entity-link" >TemplateBodyRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateCategory.html" data-type="entity-link" >TemplateCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemplateQuery.html" data-type="entity-link" >TemplateQuery</a>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
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
                                <a href="interfaces/ModuleAsyncOptions.html" data-type="entity-link" >ModuleAsyncOptions</a>
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