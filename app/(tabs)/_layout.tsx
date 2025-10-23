import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#111' : '#f8f8f8',
                    borderTopColor: '#ddd',
                    height: 60,
                    paddingBottom: 5,
                },
                headerShown: false,
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={26} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="carte"
                options={{
                    title: 'Carte',
                    tabBarIcon: ({ color }) => (
                        <Entypo name="map" size={26} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
