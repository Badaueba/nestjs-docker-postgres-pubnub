//poderia ter tabela disso
export enum NotificationTypes {
	ARTICLES = 'ARTICLES',
}

export class PubNubNotification {
	text: string;
	type: NotificationTypes;
	success: boolean;
}
