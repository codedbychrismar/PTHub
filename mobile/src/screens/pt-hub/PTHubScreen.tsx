import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function PTHubScreen() {
  // Mock data for PT packages
  const ptPackages = [
    {
      id: '1',
      name: 'Level 2 • 30-PT Sessions',
      coach: { name: 'Coach John Doe', initials: 'JD' },
      sessions: { total: 30, used: 12, remaining: 18 },
      payment: { status: 'balance', amount: 1200 },
      purchased: 'Jan 5, 2024',
      expires: 'Jul 5, 2024',
    },
    {
      id: '2',
      name: 'Level 2 • 12-PT Sessions',
      coach: { name: 'Coach Sarah Martinez', initials: 'SM' },
      sessions: { total: 12, used: 8, remaining: 4 },
      payment: { status: 'paid' },
      purchased: 'Feb 15, 2024',
      expires: 'Aug 15, 2024',
    },
  ];

  // Mock data for scheduled sessions
  const scheduledSessions = [
    {
      id: '1',
      date: 'Mon, Jan 22',
      time: '9:00 AM',
      coach: 'Coach John Doe',
      type: 'Strength Training',
      status: 'confirmed',
    },
    {
      id: '2',
      date: 'Wed, Jan 24',
      time: '2:00 PM',
      coach: 'Coach Sarah Martinez',
      type: 'HIIT Cardio',
      status: 'pending',
    },
  ];

  // Mock data for signed forms
  const signedForms = [
    {
      id: '1',
      name: 'Health & Fitness Assessment',
      date: 'Jan 5, 2024',
    },
    {
      id: '2',
      name: 'Personal Training Agreement',
      date: 'Jan 5, 2024',
    },
  ];

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 pt-12 pb-4 px-5">
        <Text className="text-3xl font-bold text-slate-900 mb-1">PT Hub</Text>
        <Text className="text-sm text-slate-600 font-medium">
          Manage your personal training packages & sessions
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Your PT Packages Section */}
        <View className="px-5 py-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="cube-outline" size={20} color="#1bc4bc" />
            <Text className="text-lg font-bold text-slate-900 ml-2">
              Your PT Packages
            </Text>
          </View>

          {ptPackages.map((pkg) => (
            <View
              key={pkg.id}
              className="bg-white rounded-2xl p-5 mb-4 border-2 border-slate-200"
              style={{
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* Package Header */}
              <View className="flex-row justify-between items-start pb-4 mb-4 border-b border-slate-200">
                <View className="flex-1">
                  <Text className="text-base font-bold text-slate-900 mb-2">
                    {pkg.name}
                  </Text>
                  <View className="flex-row items-center bg-slate-100 rounded-lg px-3 py-2 self-start">
                    <View className="w-6 h-6 rounded-full items-center justify-center mr-2">
                      <LinearGradient
                        colors={['#1bc4bc', '#4d02a0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="w-6 h-6 rounded-full items-center justify-center"
                      >
                        <Text className="text-white text-xs font-bold">
                          {pkg.coach.initials}
                        </Text>
                      </LinearGradient>
                    </View>
                    <Text className="text-sm font-semibold text-slate-700">
                      {pkg.coach.name}
                    </Text>
                  </View>
                </View>
                {pkg.payment.status === 'paid' ? (
                  <View className="bg-emerald-100 px-3.5 py-2 rounded-lg border border-emerald-200">
                    <Text className="text-xs font-bold text-emerald-800">
                      Fully Paid
                    </Text>
                  </View>
                ) : (
                  <View className="bg-red-100 px-3.5 py-2 rounded-lg border border-red-200">
                    <Text className="text-xs font-bold text-red-800">
                      ₱{pkg.payment.amount}
                    </Text>
                  </View>
                )}
              </View>

              {/* Sessions Summary */}
              <View className="flex-row gap-3 mb-4">
                <View className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 items-center">
                  <Text className="text-2xl font-extrabold text-slate-900 mb-1">
                    {pkg.sessions.total}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Total
                  </Text>
                </View>
                <View className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 items-center">
                  <Text className="text-2xl font-extrabold text-slate-600 mb-1">
                    {pkg.sessions.used}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Used
                  </Text>
                </View>
                <View className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-200 items-center">
                  <Text className="text-2xl font-extrabold text-teal-500 mb-1">
                    {pkg.sessions.remaining}
                  </Text>
                  <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    Left
                  </Text>
                </View>
              </View>

              {/* Package Dates */}
              <View className="flex-row gap-3 pt-4 border-t border-slate-200">
                <View className="flex-1 flex-row items-center gap-2">
                  <Ionicons name="calendar-outline" size={16} color="#4d02a0" />
                  <View className="flex-1">
                    <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Purchased
                    </Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {pkg.purchased}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row items-center gap-2">
                  <Ionicons name="time-outline" size={16} color="#4d02a0" />
                  <View className="flex-1">
                    <Text className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Expires
                    </Text>
                    <Text className="text-sm font-semibold text-slate-900">
                      {pkg.expires}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Scheduled Sessions Section */}
        <View className="px-5 py-6">
          <View className="flex-row items-center mb-4">
            <Ionicons name="calendar" size={20} color="#1bc4bc" />
            <Text className="text-lg font-bold text-slate-900 ml-2">
              Scheduled Sessions
            </Text>
          </View>

          {scheduledSessions.map((session) => (
            <View
              key={session.id}
              className="bg-white rounded-xl p-4 mb-3 border border-slate-200"
              style={{
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View className="flex-row justify-between items-center mb-3">
                <View>
                  <Text className="text-base font-bold text-slate-900">
                    {session.date}
                  </Text>
                  <Text className="text-sm font-semibold text-teal-500 mt-0.5">
                    {session.time}
                  </Text>
                </View>
                {session.status === 'confirmed' ? (
                  <View className="bg-emerald-100 px-2.5 py-1.5 rounded-md border border-emerald-200">
                    <Text className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                      Confirmed
                    </Text>
                  </View>
                ) : (
                  <View className="bg-amber-100 px-2.5 py-1.5 rounded-md border border-amber-200">
                    <Text className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Pending
                    </Text>
                  </View>
                )}
              </View>
              <View className="space-y-2">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="person" size={14} color="#4d02a0" />
                  <Text className="text-sm text-slate-600">
                    {session.coach}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Ionicons name="fitness" size={14} color="#4d02a0" />
                  <Text className="text-sm text-slate-600">{session.type}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Signed Forms Section */}
        <View className="px-5 py-6 pb-10">
          <View className="flex-row items-center mb-4">
            <Ionicons name="document-text" size={20} color="#1bc4bc" />
            <Text className="text-lg font-bold text-slate-900 ml-2">
              Signed Forms
            </Text>
          </View>

          {signedForms.map((form) => (
            <View
              key={form.id}
              className="bg-white rounded-xl p-4 mb-3 border border-slate-200 flex-row justify-between items-center"
              style={{
                shadowColor: '#0f172a',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View className="flex-1">
                <Text className="text-sm font-semibold text-slate-900 mb-1">
                  {form.name}
                </Text>
                <View className="flex-row items-center gap-1.5">
                  <Ionicons name="calendar-outline" size={12} color="#64748b" />
                  <Text className="text-xs text-slate-600">{form.date}</Text>
                </View>
              </View>
              <View className="bg-teal-500 px-4 py-2 rounded-lg flex-row items-center gap-1.5">
                <Ionicons name="eye" size={14} color="#ffffff" />
                <Text className="text-sm font-semibold text-white">View</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
