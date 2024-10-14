import React, { useState, useEffect} from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';
import { ButtonView } from '../../Helper/buttonView';

const DUMMY_UNSOLD = [
    {
        "key": "PUBLICATION",
        "value": "Financial Express",
        'editable': false,
    },
    {
        "key": "EDITION",
        "value": "May",
        'editable': false,
    },
    {
        "key": "DEPOT/S",
        "value": "Navi Mumbai",
        'editable': false,
    },
    {
        "key": "SUPPLY",
        "value": "-",
        'editable': false,
    },
    {
        "key": "UNSOLD",
        "value": "5,000",
        'editable': true,
    },
    {
        "key": "RETURN",
        "value": "1500",
        'editable': true,
    },
    {
        "key": "NPS",
        "value": "00",
        'editable': false,
    }
]

const DUMMY_COLLECTION = [
    {
        "key": "PUBLICATION",
        "value": "Financial Express",
        'editable': false,
    },
    {
        "key": "EDITION",
        "value": "May",
        'editable': false,
    },
    {
        "key": "DEPOT/S",
        "value": "Navi Mumbai",
        'editable': false,
    },
    {
        "key": "SUPPLY",
        "value": "20000",
        'editable': false,
    },
    {
        "key": "NPS",
        "value": "20000",
        'editable': false,
    },
    {
        "key": "OUTSTANDING (₹)",
        "value": "20000",
        'editable': false,
    },
    {
        "key": `COLLECTED (₹)`,
        "value": "21,320",
        'editable': false,
    }
]



export default function Approval(props) {
    const roleBasedGrid = props.route.params?.roleBasedGrid

    const unsoldReturnRenderItemView = (item) => {
        return (
            <View style ={{marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{item.item?.key}</Text>
                {item.item?.editable ? <TouchableOpacity onPress={() => {}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={images.file} style={{ width: 15, height:15, alignSelf: 'center'}} />
                <Text style={{color: COLORS.redPrimary, marginLeft: 6, textDecorationLine: 'underline'}}>{item.item?.value}</Text>
                </View>
                </TouchableOpacity>
                : <Text>{item.item?.value}</Text>}
            </View>
        )
    }

    const unsoldReturnView = () => {
        return(
            <View>
                <View style={{flexDirection: 'column', alignItems: 'center', margin: 16,}}>
                <Image source={images.return} style={{width: 55, height: 55}}/>
                <Text style={{color: COLORS.redPrimary, fontSize: 18, fontWeight: '600', marginTop:6,}}>{ roleBasedGrid == 1 ? "Unsold/Return Approval" : "Collection"}</Text>
                <Text style={{color: COLORS.black, fontWeight: '500', marginTop:6,}}>Navi Mumbai - SBU001 - Bharat Depot</Text>
                <Text style={{color: COLORS.black, fontWeight: '500', marginTop:6,}}>22-05-14</Text>
                </View>
                <View style={{backgroundColor: 'white', marginHorizontal: 12, marginTop: 6, padding: 10, borderRadius: 10}}>
                    <FlatList 
                        data={roleBasedGrid == 1 ? DUMMY_UNSOLD: DUMMY_COLLECTION}
                        renderItem={(item) => unsoldReturnRenderItemView(item)}
                    />
                </View>
                {roleBasedGrid == 1 ? <View style={{ bottom:0, flexDirection: 'row', marginHorizontal: 10,}}>
                    <ButtonView 
                        title={'REJECT'}
                        isPrimary ={false}
                        textStyle={{color: COLORS.redPrimary}}
                        btnStyle={{marginRight: 8}}
                        onBtnPress={() => alert("Reject is pressed")}
                    />
                    <ButtonView 
                        title={'APPROVED'}
                        onBtnPress={() => alert("Approved is pressed")}
                    />
                </View> : null}
            </View>
        )
    }

    return (
        <View>
           {unsoldReturnView()} 
        </View>
    )
}
