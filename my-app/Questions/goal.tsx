import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';
import QuesBackground from '../Questions/QuesBackground'

interface GoalProps {
    navigation: any;
}

const Goal: React.FC<GoalProps> = ({ navigation }) => {
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);
    const [stringArray, setStringArray] = useRecoilState(stringArrayState);
    const [dashes, setDashes] = useState<JSX.Element[]>([]);

    const selectGoal = (goal) => {
        setSelectedGoal(goal);
    };

    useEffect(() => {
        setIsContinueEnabled(selectedGoal !== null);
    }, [selectedGoal]);

    useEffect(() => {
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

    const addString = (newString) => {
        setStringArray((prevArray) => [...prevArray, newString]);
    };

    const handleGoal = () => {
        addString(selectedGoal);
        console.log(stringArray[0]);
        navigation.navigate("BodyType")
    }

    return (
        <QuesBackground>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.dashesContainer}>{dashes}</View>
            <Text style={styles.questionText}>What is your fitness goal?</Text>

            <TouchableOpacity
                style={[styles.goalBox, selectedGoal === 'Build muscles' && styles.selectedGoal]}
                onPress={() => selectGoal('Build muscles')}
            >
                <Text style={styles.goalText}>Gain muscles</Text>
                <Image source={require('../assets/male.png')} style={styles.goalImage} />
                {selectedGoal === 'Build muscles' && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.goalBox, selectedGoal === 'Lose weight' && styles.selectedGoal]}
                onPress={() => selectGoal('Lose weight')}
            >
                <Text style={styles.goalText}>Lose weight</Text>
                <Image source={require('../assets/loseweight.png')} style={styles.goalImage} />
                {selectedGoal === 'Lose weight' && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.goalBox, selectedGoal === 'Gain weight' && styles.selectedGoal]}
                onPress={() => selectGoal('Gain weight')}
            >
                <Text style={styles.goalText}>Gain weight</Text>
                <Image source={require('../assets/gainweight.png')} style={styles.goalImage} />
                {selectedGoal === 'Gain weight' && <Image source={require('../assets/tick.png')} style={styles.tickImage} />}
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.continueButton, isContinueEnabled && styles.continueButtonEnabled]}
                disabled={!isContinueEnabled}
                onPress={handleGoal}
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
        marginTop: 30,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
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
        color: 'white',
    },
    goalBox: {
        width: '90%',
        height: 130,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    selectedGoal: {
        borderColor: '#F9B500',
    },
    goalText: {
        fontSize: 18,
        color: 'white',
    },
    tickImage: {
        width: 30,
        height: 30,
    },
    goalImage: {
        width: 125,
        height: 125,
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

export default Goal;
