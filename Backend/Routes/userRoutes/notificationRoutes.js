import express from 'express';
import { replayToNotification, showAllNotifications, showNotificationInDetail } from '../../App/Controllers/userControllers/notifications.js';

const router = express.Router();

// base: {{host}}/api/v1/notifications/

router.route("/").get(showAllNotifications);

router.route("/:notificationId").get(showNotificationInDetail)
.post(replayToNotification)

export default router