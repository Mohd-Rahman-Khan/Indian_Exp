import { CommonActions, useNavigation } from "@react-navigation/native";

function reset(navigationProps, routeName, params = null) {
    navigationProps.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [
                {
                    name: routeName,
                    params: params,
                }
            ]
        })
    )
}

export default {
    reset,
}