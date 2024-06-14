import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';
import QuesBackground from '../Questions/QuesBackground'

interface WeightProps {
    navigation: any;
}

const Weight: React.FC<WeightProps> = ({ navigation }) => {
    const [weight, setWeight] = useState(0);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);
    const [unit, setUnit] = useState<'Kg' | 'Pound'>('Kg'); // State to track weight unit
    const [stringArray, setStringArray] = useRecoilState(stringArrayState);
    const [dashes, setDashes] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // Update dashes based on stringArray length
        const greenDashes = stringArray.length;
        const remainingDashes = 7 - greenDashes;

        const updatedDashes: JSX.Element[] = [];

        for (let i = 0; i < greenDashes; i++) {
            updatedDashes.push(
                <Ionicons key={i} name="radio-button-on" size={24} color="#F9B500" />
            );
        }

        for (let j = 0; j < remainingDashes; j++) {
            updatedDashes.push(
                <Ionicons key={greenDashes + j} name="radio-button-off" size={24} color="#ccc" />
            );
        }

        setDashes(updatedDashes);
    }, [stringArray]);

    const handleWeightChange = (value: string) => {
        const newWeight = parseInt(value);
        setWeight(newWeight);
        setIsContinueEnabled(newWeight >= 20 && newWeight <= 400);
    };

    const convertToKg = (value: number, unit: string) => {
        if (unit === 'Pound') {
            return value * 0.453592; // 1 Pound = 0.453592 Kg
        }
        return value;
    };

    const handleContinue = () => {
        const weightInKg = convertToKg(weight, unit);
        addString(weightInKg);
        console.log(
            stringArray[0] +
            stringArray[1] +
            stringArray[2] +
            stringArray[3]
        );
        navigation.navigate('Height');
    };

    const addString = (newString: any) => {
        setStringArray((prevArray: any) => [...prevArray, newString]);
    };

    return (
        <QuesBackground>
            <View style={styles.container}>
                {/* Your existing UI elements */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.dashesContainer}>{dashes}</View>
                <Text style={styles.questionText}>What is your weight?</Text>

                <View style={styles.ageContainer}>
                    <TouchableOpacity
                        style={styles.ageBox}
                        onPress={() => setWeight(0)}
                    >
                        <Text style={styles.ageText}>{weight === 0 ? '0' : weight}</Text>
                        <Text style={styles.yearsText}>{unit}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.switchContainer}>
                    <TouchableOpacity
                        style={[styles.switchOption, unit === 'Kg' && styles.selectedSwitchOption]}
                        onPress={() => setUnit('Kg')}
                    >
                        <Text>Kg</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switchOption, unit === 'Pound' && styles.selectedSwitchOption]}
                        onPress={() => setUnit('Pound')}
                    >
                        <Text>Pound</Text>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder={`Enter your weight (${unit})`}
                    keyboardType="numeric"
                    onChangeText={handleWeightChange}
                    placeholderTextColor={'white'}
                />

                <TouchableOpacity
                    style={[styles.continueButton, isContinueEnabled && styles.continueButtonEnabled]}
                    disabled={!isContinueEnabled}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </QuesBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
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
        color: 'white'
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
        color: 'black',
    },
    yearsText: {
        fontSize: 18,
        color: 'black',
    },
    switchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    switchOption: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
        borderColor: 'white',
        color: 'white'
    },
    selectedSwitchOption: {
        backgroundColor: '#F9B500',
        color: 'white'
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'white'
    },
    continueButton: {
        borderWidth: 2,
        borderColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    continueButtonEnabled: {
        backgroundColor: '#072E33',
    },
    continueButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Weight;
