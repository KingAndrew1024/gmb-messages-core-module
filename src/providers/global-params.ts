
export class AppSettingsService {
    constructor(settings: GmbMessagesModuleOptionsInterface) {
        this.setApiUrl(settings.apiUrl);
        this.setInstanceName(settings.instanceName);
    }

    private apiUrl: string;
    private instanceName: string;

    setApiUrl(url: string) { this.apiUrl = url; }
    getApiUrl() { return this.apiUrl; }
    setInstanceName(val: string) { this.instanceName = val };
    getInstanceName() { return this.instanceName };
}

export interface GmbMessagesModuleOptionsInterface{
    apiUrl: string
    instanceName: string
  };