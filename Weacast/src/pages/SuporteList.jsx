import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Octicons';
import SideMenu from '../components/Menu';

export default function SuporteList({ navigation }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ticketData, setTicketData] = useState([]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const filteredKeys = keys.filter(key => key.startsWith('suporte_ticket_'));
                const tickets = await AsyncStorage.multiGet(filteredKeys);

                setTicketData(tickets.map(item => ({ key: item[0], data: item[1] })));
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        };

        retrieveData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.menuIcon}>
                <TouchableOpacity onPress={toggleMenu}>
                    <Icon name="three-bars" size={30} color='white'/>
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={ticketData}
                renderItem={({ item }) => (
                    <View style={styles.ticketItem}>
                        <Text style={styles.ticketText}>{item.key}: {item.data}</Text>
                    </View>
                )}
                keyExtractor={item => item.key}
            />

            <SideMenu isOpen={isMenuOpen} onClose={closeMenu} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
    },
    ticketItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    ticketText: {
        color: 'white',
        fontSize: 16,
    },
});
