export type Notification = {
    title: string
    body: string
    hour: number
}

export const notifications: Notification[] = [
    {
        title: "Доброе утро!",
        body: "Самое время приступить к утренним привычкам",
        hour: 8,
    },
    {
        title: "Добрый вечер!",
        body: "Пора закрепить успехи дня",
        hour: 19,
    },
]

export function scheduleNextNotification() {
    const now = new Date()
    const nextNotification = notifications.find((n) => n.hour > now.getHours()) ?? notifications[0]
    const nextNotificationTime = new Date(now)
    nextNotificationTime.setHours(nextNotification.hour, 0, 0, 0)
    if (nextNotificationTime < now) {
        nextNotificationTime.setDate(nextNotificationTime.getDate() + 1)
    }
    const msUntilNotification = nextNotificationTime.getTime() - now.getTime()
    setTimeout(() => {
        new Notification(nextNotification.title, { body: nextNotification.body })
        scheduleNextNotification()
    }, msUntilNotification)
}
