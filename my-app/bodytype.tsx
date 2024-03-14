import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from './recoilStore';

interface BodyTypeProps {
    navigation: any;
}

const BodyType: React.FC<BodyTypeProps> = ({ navigation }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);
    const [stringArray, setStringArray] = useRecoilState(stringArrayState);
    const [dashes, setDashes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const greenDashes = stringArray.length;
        const remainingDashes = 7 - greenDashes;

        const updatedDashes: JSX.Element[] = [];

        for (let i = 0; i < greenDashes; i++) {
            updatedDashes.push(
                <Ionicons key={i} name="radio-button-on" size={24} color="#39FF14" />
            );
        }

        for (let j = 0; j < remainingDashes; j++) {
            updatedDashes.push(
                <Ionicons key={greenDashes + j} name="radio-button-off" size={24} color="#ccc" />
            );
        }

        setDashes(updatedDashes);
    }, [stringArray]);

    const selectType = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        setIsContinueEnabled(selectedType !== null);
    }, [selectedType]);

    const addString = (newString) => {
        setStringArray((prevArray) => [...prevArray, newString]);
    };

    const handleBodyType = () => {
        addString(selectedType);
        console.log(stringArray[0] + stringArray[1]);
        navigation.navigate("Age")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.dashesContainer}>{dashes}</View>
            <Text style={styles.questionText}>What's your body type?</Text>

            <TouchableOpacity
                style={[styles.typeBox, selectedType === 'skinny' && styles.selectedType]}
                onPress={() => selectType('skinny')}
            >
                <Text style={styles.typeText}>Skinny</Text>
                <Image source={require('./assets/gainweight.png')} style={styles.typeImage} />
                {selectedType === 'skinny' && <Image source={require('./assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.typeBox, selectedType === 'ideal' && styles.selectedType]}
                onPress={() => selectType('ideal')}
            >
                <Text style={styles.typeText}>Ideal</Text>
                <Image source={require('./assets/Ideal.png')} style={styles.typeImage} />
                {selectedType === 'ideal' && <Image source={require('./assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.typeBox, selectedType === 'flabby' && styles.selectedType]}
                onPress={() => selectType('flabby')}
            >
                <Text style={styles.typeText}>Flabby</Text>
                <Image source={require('./assets/flabby.png')} style={styles.typeImage} />
                {selectedType === 'flabby' && <Image source={require('./assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.typeBox, selectedType === 'heavier' && styles.selectedType]}
                onPress={() => selectType('heavier')}
            >
                <Text style={styles.typeText}>Heavier</Text>
                <Image source={require('./assets/heavier.webp')} style={styles.typeImage} />
                {selectedType === 'heavier' && <Image source={require('./assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.continueButton, isContinueEnabled && styles.continueButtonEnabled]}
                disabled={!isContinueEnabled}
                onPress={handleBodyType}
            >
                <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    dashesContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row',
    },
    questionText: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    typeBox: {
        width: '80%',
        height: 120,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    selectedType: {
        borderColor: '#39FF14',
    },
    typeText: {
        fontSize: 18,
    },
    tickImage: {
        width: 30,
        height: 30,
    },
    typeImage: {
        width: 115,
        height: 115,
    },
    continueButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    continueButtonEnabled: {
        backgroundColor: '#39FF14',
    },
    continueButtonText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default BodyType;
