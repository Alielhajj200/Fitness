import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from './recoilStore';

interface AgeProps {
    navigation: any;
}

const Age: React.FC<AgeProps> = ({ navigation }) => {
    const [age, setAge] = useState(0);
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

    const handleAgeChange = (value: string) => {
        const newAge = parseInt(value);
        setAge(newAge);
        setIsContinueEnabled(newAge >= 10 && newAge <= 100);
    };

    const handleAge = () => {
        addString(age);
        console.log(stringArray[0] + stringArray[1] + stringArray[2]);
        navigation.navigate("Weight")
    }

    const addString = (newString: any) => {
        setStringArray((prevArray: any) => [...prevArray, newString]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.dashesContainer}>{dashes}</View>
            <Text style={styles.questionText}>How old are you?</Text>

            <View style={styles.ageContainer}>
                <TouchableOpacity
                    style={styles.ageBox}
                    onPress={() => setAge(0)}
                >
                    <Text style={styles.ageText}>{age === 0 ? '0' : age}</Text>
                    <Text style={styles.yearsText}>years</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter your age"
                keyboardType="numeric"
                onChangeText={handleAgeChange}
            />

            <TouchableOpacity
                style={[styles.continueButton, isContinueEnabled && styles.continueButtonEnabled]}
                disabled={!isContinueEnabled}
                onPress={handleAge}
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
    ageContainer: {
        alignItems: 'center',
    },
    ageBox: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    ageText: {
        fontSize: 50,
        color: 'grey',
    },
    yearsText: {
        fontSize: 18,
        color: 'grey',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
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

export default Age;
