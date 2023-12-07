import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomAnimatedAccordion = () => {

    const [expanded, setExpanded] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const toggleAccordion = () => {
        if (expanded) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setExpanded(false));
        } else {
            setExpanded(true);
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const rotateIcon = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const animatedStyle = {
        maxHeight: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        }),
        overflow: 'hidden',
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleAccordion}>
                <View
                    style={[
                        styles.titleContainer,
                        { backgroundColor: 'red' },
                    ]}>
                    <Icon
                        name={expanded ? 'expand-less' : 'expand-more'}
                        size={20}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            {expanded ? (
                <Animated.View style={[styles.content, animatedStyle]}>
                    <View>
                        <Text> My Chart</Text>
                    </View>
                </Animated.View>

            ) : (<View></View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        backgroundColor: '#F0F0F0',
        borderRadius: 0,
        marginTop: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
});

export default CustomAnimatedAccordion;
