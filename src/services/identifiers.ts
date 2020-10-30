import { InjectionToken } from '@angular/core';

import { IGmbMessagesService } from '../core/contracts/IGmbMessages.service';

export const GMB_MESSAGES_SERVICE = new InjectionToken<IGmbMessagesService>('GmbMessagesService');

