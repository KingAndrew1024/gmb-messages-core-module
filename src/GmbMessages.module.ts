import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { messagesReducer } from './store/GmbMessages.reducer';
import { MessagesEffects } from './store/GmbMessages.effects';
import { MessagesModuleOptionsInterface, AppSettingsService } from './providers/global-params';
import { GMB_MESSAGES_SERVICE } from './services/identifiers';
import { GmbMessagesService } from './services/GmbMessages.service';
import { MessagesRepository } from './repositories/GmbMessages.repository';
import { MessagesStore } from './services/state/GmbMessages.store';


export const AppSettingsObject = new InjectionToken('AppSettingsObject');

export function createAppSettingsService(settings: MessagesModuleOptionsInterface) {
  return new AppSettingsService(settings);
}


@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forFeature('messages', messagesReducer),
    EffectsModule.forFeature([MessagesEffects]),
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
export class MessagesCoreModule {
  static forRoot(config: MessagesModuleOptionsInterface): ModuleWithProviders<MessagesCoreModule> {
    return {
      ngModule: MessagesCoreModule,
      providers: [ 
        { provide: AppSettingsObject, useValue: config },
        {
          provide: AppSettingsService,
          useFactory: (createAppSettingsService),
          deps: [AppSettingsObject]
        },
        { provide: GMB_MESSAGES_SERVICE, useClass: GmbMessagesService },
        MessagesRepository,
        MessagesStore
      ]
    };
  }
}

