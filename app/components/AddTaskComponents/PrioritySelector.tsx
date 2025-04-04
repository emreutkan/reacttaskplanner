import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { PRIORITY_COLORS, SIZES } from '../../theme';
import { TaskPriority } from '../../types';
import FormSection from './FormSection';
import { Ionicons } from '@expo/vector-icons';
import {useTheme} from '../../context/ThemeContext';

interface PrioritySelectorProps {
    selectedPriority: TaskPriority;
    onSelectPriority: (priority: TaskPriority) => void;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
                                                               selectedPriority,
                                                               onSelectPriority
                                                           }) => {

    const { colors } = useTheme();
    const {isDark} = useTheme();

    const styles = StyleSheet.create({
        priorityContainer: {
            flexDirection: 'column',
        },
        priorityButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: SIZES.base,
            paddingVertical: SIZES.medium,
            paddingHorizontal: SIZES.medium,
            marginBottom: SIZES.small,
            backgroundColor: colors.card,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0,0.1)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                },
                android: {
                    elevation: 1,
                }
            }),
        },
        selectedButton: {
            borderWidth: 0,
        },
        priorityInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        iconContainer: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.medium,
        },
        textContainer: {
            flex: 1,
        },
        priorityButtonText: {
            color: colors.text,
            fontSize: SIZES.medium,
            fontWeight: '600',
        },
        priorityDescription: {
            color: colors.text + '80',
            fontSize: SIZES.font - 2,
            marginTop: 2,
        },
        selectionIndicator: {
            padding: 6,
        }
    });


    const priorityOptions: {
        value: TaskPriority;
        label: string;
        icon: string;
        description: string;
    }[] = [
        {
            value: 'high',
            label: 'high',
            icon: 'alert-circle',
            description: 'Must be done ASAP'
        },
        {
            value: 'normal',
            label: 'normal',
            icon: 'bookmark',
            description: 'Standard priority'
        },
        {
            value: 'low',
            label: 'low',
            icon: 'flag',
            description: 'Can be done later'
        },

    ];

    return (
        <FormSection title="Priority">
            <View style={styles.priorityContainer}>
                {priorityOptions.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={[
                            styles.priorityButton,
                            selectedPriority === option.value && styles.selectedButton,
                            {
                                borderLeftWidth: 4,
                                borderLeftColor: PRIORITY_COLORS[option.value],
                            },
                            selectedPriority === option.value && {
                                backgroundColor: isDark ? PRIORITY_COLORS[option.value] + '20' : "#f0f0f0",
                            }
                        ]}
                        onPress={() => onSelectPriority(option.value)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.priorityInfo}>
                            <View style={[
                                styles.iconContainer,
                                // { backgroundColor: PRIORITY_COLORS[option.value] + '20' }
                            ]}>
                                <Ionicons
                                    name={option.icon as any}
                                    size={18}
                                    color={PRIORITY_COLORS[option.value]}
                                />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.priorityButtonText}>
                                    {option.label}
                                </Text>
                                <Text style={styles.priorityDescription}>
                                    {option.description}
                                </Text>
                            </View>
                        </View>

                        {selectedPriority === option.value && (
                            <View style={styles.selectionIndicator}>
                                <Ionicons
                                    name="checkmark-circle"
                                    size={22}
                                    color={PRIORITY_COLORS[option.value]}
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </FormSection>
    );
};


export default PrioritySelector;