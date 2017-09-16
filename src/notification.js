// Notifications
var supportNotification = "Notification" in window;

export const maybeGetPermission = () => {
  if (!supportNotification) {
	return;
  }
  if (Notification.permission === "granted") {
	return;
  }
  Notification.requestPermission();
}

// TODO: Call when appropriate.
maybeGetPermission();

export const notify = (message, onclick) => {
	if (!supportNotification || Notification.permission !== "granted") {
		console.error('permission is not granted.');
		return null;
	}
	const options = {
		requireInteraction: true,
		tag: 'pomodoro-notification'
	};
	const notif = new Notification(message, options);
	notif.onclick = function(e) {
		if (onclick) {
			onclick(e);
		}
		notif.close();
		window.focus();
	};
	return notif;
};
