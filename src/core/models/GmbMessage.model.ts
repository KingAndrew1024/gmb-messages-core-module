import { IGmbMessageApiProps } from "../contracts/IGmbMessages.repository";


export class GmbMessagesPageModel implements IGmbMessagesPageProps{
    totals: { total: number; read: number; new: number; };
    messages: GmbMessageModel[];

    constructor(data: IGmbMessagesPageProps){
        this.totals = data.totals
        this.messages = data.messages
    }

    static empty(){
        return new GmbMessagesPageModel({
            totals: {total: 0, read: 0, new: 0},
            messages: []
        })
    }
}

export interface IGmbMessagesPageProps{
    totals:{
        total: number
        read: number
        new: number
    }
    messages: Array<GmbMessageModel>
}

export class GmbMessageModel implements IGmbMessageModelProps{
    
    constructor(data: IGmbMessageModelProps){
        this.messageId = data.messageId
        this.userName = data.userName
        this.message = data.message
        this.userEmail = data.userEmail
        this.userPhone = data.userPhone
        this.timestamp = data.timestamp
        this.readStatus = data.readStatus
        const shortMsg = (data.shortMessage || data.message.substring(0, 30));
        this.shortMessage = shortMsg.length >= 30 ? shortMsg.concat('...') : shortMsg;
    }

    shortMessage: string;
    messageId: number;
    userName: string;
    message: string;
    userEmail: string;
    userPhone: string;
    timestamp: string;
    readStatus: 0 | 1;

    static toStorage() {}

    static fromApiResponse(data: IGmbMessageApiProps): GmbMessageModel {
        return new GmbMessageModel({
            messageId: +data.message_id,
            userName: data.user_name,
            message: data.message,
            userEmail: data.user_email,
            userPhone: data.user_phone,
            timestamp: data.timestamp,
            readStatus: data.read_status === '0' ? 0 : 1,
            shortMessage: null
        });
    }

    static empty(): GmbMessageModel{
        return new GmbMessageModel({
            messageId: null,
            userName: null,
            message: null,
            userEmail: null,
            userPhone: null,
            timestamp: null,
            readStatus: null,
            shortMessage: null
        });
    }
}

export interface IGmbMessageModelProps{
    messageId: number
    userName: string
    message: string
    shortMessage: string
    userEmail: string
    userPhone: string
    timestamp: string
    readStatus: 0 | 1
}