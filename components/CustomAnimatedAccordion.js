import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BBLineChart from './BBLineChart';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import { CandlestickBandsChart } from './CandlestickBandsChart';


const CustomAnimatedAccordion = ({ symbol }) => {

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

    
    const { intervals } = useContext(OptionsCurrenciesContext);

    const [interval, setInterval] = useState('1d');
    useEffect(() => {
        let interval = intervals.find(i => i.checked === true);
        setInterval(interval.name);
    }, [intervals])

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={toggleAccordion}>
                <View>
                    <Icon
                        name={expanded ? 'expand-less' : 'expand-more'}
                        size={20}
                        style={styles.icon}
                    />
                </View>
            </TouchableOpacity>
            {expanded ? (
                <Animated.View style={[styles.content, animatedStyle]}>
                    <CandlestickBandsChart symbol={symbol} interval={interval} />
                </Animated.View>

            ) : (<View></View>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 5
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
