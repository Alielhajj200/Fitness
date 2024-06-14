import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { stringArrayState } from '../recoilStore';
import QuesBackground from '../Questions/QuesBackground'

interface AgeProps {
    navigation: any;
}

const Age: React.FC<AgeProps> = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAge, setSelectedAge] = useState(0);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);
    const [stringArray, setStringArray] = useRecoilState(stringArrayState);
    const [dashes, setDashes] = useState<JSX.Element[]>([]);

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

    const handleAgeSelect = (age: number) => {
        setSelectedAge(age);
        setIsContinueEnabled(age >= 10 && age <= 100);
        toggleModal();
    };

    const handleAge = () => {
        addString(selectedAge);
        console.log(stringArray[0] + stringArray[1] + stringArray[2]);
        navigation.navigate("Weight")
    }

    const addString = (newString: any) => {
        setStringArray((prevArray: any) => [...prevArray, newString]);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <QuesBackground>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.dashesContainer}>{dashes}</View>
                <Text style={styles.questionText}>How old are you?</Text>

                <TouchableOpacity onPress={toggleModal} style={styles.ageBox}>
                    <Text style={styles.ageText}>{selectedAge === 0 ? 'Select Age' : selectedAge}</Text>
                    <Ionicons name="chevron-down" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.continueButton, isContinueEnabled && styles.continueButtonEnabled]}
                    disabled={!isContinueEnabled}
                    onPress={handleAge}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={toggleModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                {[...Array(91)].map((_, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={styles.modalItem}
                                        onPress={() => handleAgeSelect(i + 10)}
                                    >
                                        <Text style={styles.modalItemText}>{i + 10}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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
    ageBox: {
        width: 150,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    ageText: {
        fontSize: 18,
        color: 'black',
        marginRight: 10,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: '95%',
        maxWidth: 500, // Adjusted maximum width
        maxHeight:600
    },
    modalItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalItemText: {
        fontSize: 16, // Adjusted font size
        color: 'black',
    },
    
    
});

export default Age;
