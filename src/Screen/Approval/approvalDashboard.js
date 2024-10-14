import React, { useState, useEffect} from 'react'
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../Image';
import COLORS from '../../GlobalConstants/COLORS';
import { ButtonView } from '../../Helper/buttonView';
import { routers } from '../../Constant';
import auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DUMMY_UNSOLD = [
    {
        "heading": "SHIP TO CODE",
        "value": "SBU0015",
        'date': '22-05-14',
    },
    {
        "heading": "SHIP TO CODE",
        "value": "SBU0016",
        'date': '22-05-13',
    },
    {
        "heading": "SHIP TO CODE",
        "value": "SBU0015",
        'date': '22-05-12',
    },
    {
        "heading": "SHIP TO CODE",
        "value": "SBU0017",
        'date': '22-05-11',
    },
]

export default function ApprovalDashboard({navigation, route}) {
    
    const roleBasedGrid = route.params?.roleBasedGrid;
    
    useEffect(() => {
        getRecordsTotal()
        getRecords()
    }, [])

    const getRecordsTotal = async () => {
        const token = await AsyncStorage.getItem('InExToken')
        // await unsoldReturnApproval()
    }

    const getRecords = async () => {
        const token = await AsyncStorage.getItem('InExToken')
        console.log('token: ', token);
        const userId = await AsyncStorage.getItem('InExUserId')
        console.log('userId: ', userId);
        
        const response = await auth.collectionApproval(userId, true, token)
        console.log('response: ', response.data);
        
    }
 
    const unsoldReturnRenderItemView = (item) => {
        return (
            <View style={{flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 10, height: 70, marginVertical: 10, paddingLeft:12, paddingRight: 8, alignItems: 'center' }}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate('Approval', {titleName: roleBasedGrid == 1 ? 'Approval': "Collection View", roleBasedGrid})}>
                    <View style={{flex: 0.9}}>
                        <Text style={{fontSize: 16, fontWeight: '700', color: COLORS.black}}>{roleBasedGrid == 1 ? item.item?.heading : item.item?.heading.replace("SHIP", "BILL") + " : " + item.item?.value}</Text>
                        <Text style={{color: COLORS.black, fontWeight: '500', paddingTop:4}}>{item.item?.date}</Text>
                    </View>
                    <Image style={{flex: 0.1}} source={images.file}/>
                    </TouchableOpacity>
                </View>
        )
    }

    const recordsView = () => {
        return(
            <View style={{marginVertical: 12,}}>
                <FlatList 
                data={DUMMY_UNSOLD}
                renderItem ={(item) =>  unsoldReturnRenderItemView(item)}
            />
            </View>
        )
    }

    const graphView = () => {
        return(
            <View style={{backgroundColor: COLORS.white, height: 350, borderRadius: 10, marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Graph</Text>
            </View>
        )
    }

    const listHeaderView = () => {
        return(
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, marginTop: 5}}>
                    <Text style={{color: COLORS.black, fontSize: 20, fontWeight: '700'}}>Unsold/Return Approval</Text>
                    <Text style={{color: COLORS.redPrimary, fontSize: 16, fontWeight: '500', paddingRight: 8}}>Weekly</Text>
                </View>
                {graphView()}
            </View>
        )
    }

    const unsoldReturnView = () => {
        return(
            <View style={{marginHorizontal: 12, marginTop: 12}}>
                <FlatList
                data={DUMMY_UNSOLD}
                renderItem ={(item) =>  unsoldReturnRenderItemView(item)}
                ListHeaderComponent={listHeaderView()}
                showsVerticalScrollIndicator={false}
            />
                
                {/* {recordsView()} */}
                {/* <View style={{flexDirection: 'column', alignItems: 'center', margin: 16,}}>
                <Image source={images.return} style={{width: 55, height: 55}}/>
                <Text style={{color: COLORS.redPrimary, fontSize: 18, fontWeight: '600', marginTop:6,}}>{ roleBasedGrid == 1 ? "Unsold/Return Approval" : "Collection"}</Text>
                <Text style={{color: COLORS.black, fontWeight: '500', marginTop:6,}}>Navi Mumbai - SBU001 - Bharat Depot</Text>
                <Text style={{color: COLORS.black, fontWeight: '500', marginTop:6,}}>22-05-14</Text>
                </View>
                <View style={{backgroundColor: 'white', marginHorizontal: 12, marginTop: 6, padding: 10, borderRadius: 10}}>
                    <FlatList 
                        data={roleBasedGrid == 1 ? DUMMY_UNSOLD: DUMMY_COLLECTION}
                        renderItem={(item) =>unsoldReturnRenderItemView(item)}
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
                </View> : null} */}
            </View>
        )
    }

    return (
        <View>

           {unsoldReturnView()} 
        </View>
    )
}
