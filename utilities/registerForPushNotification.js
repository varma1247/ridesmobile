import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import axios from "axios"
import Constants from "expo-constants";
export default registerForPushNotifications = async (token) => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  try {
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let expotoken = await Notifications.getExpoPushTokenAsync();
    const { data } = await axios.post(
        "http://192.168.1.76:5000/saveexpotoken",
        {expotoken:expotoken},
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
};
//  {
//   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//   if (status !== "granted") {
//     return;
//   }
//   let token = await Notifications.getExpoPushTokenAsync();

// };
