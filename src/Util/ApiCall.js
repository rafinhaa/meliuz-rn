import React, {useState, useEffect} from 'react';
import request from '../Services/api';
import {View, Text, Image, StyleSheet, Pressable, Dimensions} from 'react-native';


function GetDogs(){
    const [dogs, setDogs] = useState([]);
    const [reload, serReload] = useState(false); 

    useEffect(() => {
        request.get('').then(
            (response) => { 
                setDogs(response.data); // Pega os dados da API e coloca na variavel pokemon
                console.log(response.data);
            }
        ).catch( // Se ocorrer um erro, o catch é executado
            (error) => {
                alert(error);
            }
        );
    }, [reload]);

    return (
        <View
            style={styles.default}
        >
            {
                dogs.map((dog, index) => (
                    <View key={index}>
                        <Image style={styles.dogPicture} source={dog} />
                        <Text>{dog.name}</Text>
                    </View>
                ))
            }
            <Pressable 
                style={styles.pressComponent}
                onPress={() => serReload(!reload)}>
                <Text
                    style={styles.textPressable}
                >Atualizar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        alignItems: 'center',
    },
    dogPicture: {
        width: Dimensions.get('window').width,
        height: 300,
    },
    pressComponent: {
        flex: 1,
        backgroundColor: '#FF22DD',
        paddingVertical: 12,
        width: Dimensions.get('window').width / 2,
    },
    textPressable: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default GetDogs;