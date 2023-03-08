import { datadogRum } from '@datadog/browser-rum'
import { VERSION } from '../../version'

export const initDataDogRum = (context: object) => {
	datadogRum.init({
		applicationId: '20b0f3b8-2651-4ef9-a37b-8fad3e703659',
		clientToken: 'pub73e95dbc036a36834730425caba13fc7',
		site: 'datadoghq.com',
		service: 'token_negotiator',
		version: VERSION,
		sessionSampleRate: 100,
		sessionReplaySampleRate: 0,
		trackUserInteractions: false,
		trackResources: false,
		trackLongTasks: false,
		defaultPrivacyLevel: 'mask-user-input',
	})

	datadogRum.startSessionReplayRecording()

	datadogRum.setGlobalContextProperty('config', context);
}
