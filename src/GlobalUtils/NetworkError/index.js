import React from 'react'
import { View, Text, Image } from 'react-native'
import Images from '../../Image'
import COLORS from '../../GlobalConstants/COLORS'

export default function NetworkError() {
    return (
        <View style={{backgroundColor: COLORS.redPrimary}}>
            <Text style={{color: COLORS.white}}>Network Issue Please Try Again Later...</Text>
        </View>
    )
}

