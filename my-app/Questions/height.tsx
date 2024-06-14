import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';
import QuesBackground from '../Questions/QuesBackground'
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface HeightProps {
    navigation: any;
}

const Height: React.FC<HeightProps> = ({ navigation }) => {
    const [height, setHeight] = useState(0);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);
    const [unit, setUnit] = useState('cm');
    const [stringArray, setStringArray] = useRecoilState(stringArrayState);
    const handleHeightChange = (value: string) => {
        const newHeight = parseInt(value);
        setHeight(newHeight);
        if (unit === 'cm') {
            setIsContinueEnabled(newHeight >= 60 && newHeight <= 270);
        } else {
            setIsContinueEnabled(newHeight >= 2 && newHeight <= 9);
        }
    };

    const convertToCm = (value: number, unit: string) => {
        if (unit === 'ft') {
            return value * 30.48; // 1 foot = 30.48 cm
        }
        return value;
    };

    const addString = (newString) => {
        setStringArray((prevArray) => [...prevArray, newString]);
    };

    const handleContinue = () => {
        const heightInCm = convertToCm(height, unit);
        addString(heightInCm);
        console.log(
            stringArray[0] +
            stringArray[1] +
            stringArray[2] +
            stringArray[3] +
            stringArray[4]
        );
        navigation.navigate('Activitylevel');
    };

    const renderDashes = () => {
        const greenDashes = stringArray.length;
        const remainingDashes = 7 - greenDashes;

        const dashes = [];

        for (let i = 0; i < greenDashes; i++) {
            dashes.push(<Ionicons key={i} name="radio-button-on" size={24} color="#F9B500" />);
        }

        for (let j = 0; j < remainingDashes; j++) {
            dashes.push(<Ionicons key={greenDashes + j} name="radio-button-off" size={24} color="#ccc" />);
        }

        return dashes;
    };

    return (
        <QuesBackground>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.dashesContainer}>{renderDashes()}</View>
            <Text style={styles.questionText}>How tall are you?</Text>

            <View style={styles.ageContainer}>
                <TouchableOpacity
                    style={styles.ageBox}
                    onPress={() => setHeight(0)}
                >
                    <Text style={styles.ageText}>{height === 0 ? '0' : height}</Text>
                    <Text style={styles.yearsText}>{unit}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.switchContainer}>
                <TouchableOpacity
                    style={[styles.switchOption, unit === 'cm' && styles.selectedSwitchOption]}
                    onPress={() => setUnit('cm')}
                >
                    <Text>cm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.switchOption, unit === 'ft' && styles.selectedSwitchOption]}
                    onPress={() => setUnit('ft')}
                >
                    <Text>ft</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter your height"
                keyboardType="numeric"
                placeholderTextColor={'white'}
                onChangeText={handleHeightChange}
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
        marginTop:30
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
        color:'white'
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
        color:'white',
        borderColor:'white'
    },
    selectedSwitchOption: {
        backgroundColor: '#F9B500',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        color:'white'
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

export default Height;
