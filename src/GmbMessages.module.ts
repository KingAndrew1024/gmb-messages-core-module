import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { gmbMessagesReducer } from './store/GmbMessages.reducer';
import { GmbMessagesEffects } from './store/GmbMessages.effects';
import { GmbMessagesModuleOptionsInterface, AppSettingsService } from './providers/global-params';
import { GMB_MESSAGES_SERVICE } from './services/identifiers';
import { GmbMessagesService } from './services/GmbMessages.service';
import { GmbMessagesRepository } from './repositories/GmbMessages.repository';
import { GmbMessagesStore } from './services/state/GmbMessages.store';


export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: GmbMessagesModuleOptionsInterface) {
  return new AppSettingsService(settings);
}


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('gmbMessages', gmbMessagesReducer),
    EffectsModule.forFeature([GmbMessagesEffects]),
  ],
  providers:[
    
  ],
  declarations: [
    // declare all components that your module uses
    //MyComponent
  ],
  exports: [
    // export the component(s) that you want others to be able to use
    //MyComponent
  ]
})
export class GmbMessagesCoreModule {
  static forRoot(config: GmbMessagesModuleOptionsInterface): ModuleWithProviders<GmbMessagesCoreModule> {
    return {
      ngModule: GmbMessagesCoreModule,
      providers: [ 
        { provide: AppSettingsObject, useValue: config },
        {
          provide: AppSettingsService,
          useFactory: (createAppSettingsService),
          deps: [AppSettingsObject]
        },
        { provide: GMB_MESSAGES_SERVICE, useClass: GmbMessagesService },
        GmbMessagesRepository,
        GmbMessagesStore
      ]
    };
  }
}

