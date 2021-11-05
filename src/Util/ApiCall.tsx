import React, {useState, useEffect} from 'react';
import request from '../Services/api';
import {View, Text, Image, StyleSheet, Pressable, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

interface IBreedsData {
    id: number;
    name: string;
    bred_for: string;
    breed_group: string;    
}
interface IFindYouDogData {
    id: string;
    url: string;
    breeds?: IBreedsData[];
}

const GetDogs: React.FC = () => {
    const [dogs, setDogs] = useState<IFindYouDogData[]>([]);
    const [reload, serReload] = useState(false); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        request.get('').then(
            (response) => { 
                setDogs(response.data); // Pega os dados da API e coloca na variavel pokemon
                console.log(response.data);
            }
        ).catch( // Se ocorrer um erro, o catch é executado
            (error) => {
                alert(error);
            }
        ).finally(
            () => {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        );
    }, [reload]);
    
    if (loading) {
        return (
            <View
                style={styles.default}
            >
                <LottieView source={require('../Animation/dog.json')} autoPlay loop style={styles.animation} />
            </View>
        );
    }

    return (
        <View
            style={styles.default}
        >
            {
                dogs.map((dog, index) => (
                    <View key={index}>
                        <Image style={styles.dogPicture} source={{uri: dog.url}} />
                        <Text>
                            {
                                dog.breeds?.map((breed, index) => (
                                        breed.name
                                ))
                            }
                        </Text>
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
    animation: {
        width: Dimensions.get('window').width,
        height: 300,
    }
});

export default GetDogs;