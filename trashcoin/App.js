import { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Animated, Dimensions,
  FlatList, Alert, ActivityIndicator, Platform, Modal, Switch,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// --- SUPABASE DATABASE CONFIGURATION ---
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://cuferjmilhosjovbrxjr.supabase.co";
const SUPABASE_KEY = "sb_publishable_PcLv9mspUaD1K-KYqxMuyA_3HCRvUgc";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
// ----------------------------------------
const { width, height } = Dimensions.get("window");

const APP_NAME = "TrashCoin";
const PROMOTION_DATE = new Date("2026-07-31");

// ─── ECO FACTS ────────────────────────────────────────────────────
const ECO_FACTS = [
  { icon: "🌍", fact: "Chaque tonne de papier recyclé sauve 17 arbres et 26 500 litres d'eau.", color: "#1A8A5A" },
  { icon: "🥤", fact: "Une bouteille plastique met 450 ans à se décomposer dans la nature.", color: "#E05252" },
  { icon: "⚡", fact: "Recycler une canette d'aluminium économise 95% de l'énergie nécessaire à en fabriquer une neuve.", color: "#F4B942" },
  { icon: "🐠", fact: "8 millions de tonnes de plastique finissent dans les océans chaque année.", color: "#3B82F6" },
  { icon: "♻️", fact: "Le verre peut être recyclé à l'infini sans perdre en qualité.", color: "#8B5CF6" },
  { icon: "🌿", fact: "Le compostage des déchets organiques réduit les émissions de méthane de 50%.", color: "#059669" },
  { icon: "📱", fact: "Un smartphone contient plus de 60 matériaux différents, dont des métaux rares récupérables.", color: "#6366F1" },
  { icon: "💧", fact: "Recycler 1 kg de plastique économise 2 kg de CO₂ dans l'atmosphère.", color: "#0EA5E9" },
];

const INITIAL_USERS = [
  { id: "ID_01", username: "abeidy", nom: "Abeidy Abdi", password: "4821", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_02", username: "kabdoullah", nom: "Abdoullah Ahmed Karim", password: "7319", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_03", username: "aabdivall", nom: "Abdi Vall Abdi Vall", password: "1054", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_04", username: "habdy", nom: "Abdy Horma", password: "8942", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_05", username: "skhalifa", nom: "Siham Ahmed Khalifa", password: "3167", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_06", username: "kalmine", nom: "Almine Adamou Arouna Khayra", password: "6205", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_07", username: "hba", nom: "Ba Hawa", password: "9541", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_08", username: "jcheikh", nom: "Cheikh Jemal", password: "2783", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_09", username: "sdiabira", nom: "Diabira Sarah", password: "5139", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_10", username: "mdiabira", nom: "Diabira Maryam", password: "8416", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_11", username: "aghailany", nom: "El Ghailany Mohamed Abd Salam", password: "3951", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_12", username: "ekeihl", nom: "Ely Keihel Ely", password: "7024", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_13", username: "gfenoza", nom: "Fenozafitsara Gabrielle", password: "1683", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_14", username: "mhaiba", nom: "Haiba Mama", password: "6767", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_15", username: "ahormatallah", nom: "Alia Hormatallah", password: "8130", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_16", username: "ikhaida", nom: "Khaide Idoumou", password: "2647", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_17", username: "okotob", nom: "Kotob Oumeima", password: "9071", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_18", username: "jmichel", nom: "Michel Jamila", password: "4359", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_19", username: "emsaboue", nom: "Msaboue Emira", password: "6182", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_20", username: "kndaw", nom: "N'Daw Khady", password: "7814", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_21", username: "smichel", nom: "Ould Michel Sadia", password: "3526", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_22", username: "tbabah", nom: "Babah Ahmed Tariq", password: "1940", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_23", username: "tsanogo", nom: "Sanago Tahiro", password: "8703", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_24", username: "ksenad", nom: "Senad Khaled", password: "5261", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_25", username: "jsounkalo", nom: "Sounkalo Jiddou", password: "6938", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_26", username: "athiam", nom: "Thiam Abou", password: "1074", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },
  { id: "ID_27", username: "stolba", nom: "Tolba Mohamed Said", password: "4295", classe: "2nde Opaline", points: 0, hasChangedPassword: false, history: [] },

];

let USERS_DB = [...INITIAL_USERS];

const checkSystemTransition = () => {
  const now = new Date();
  if (now > PROMOTION_DATE) {
    USERS_DB = USERS_DB.map(u => ({ ...u, classe: "Première", points: 0, history: [] }));
    return true;
  }
  return false;
};

const C = {
  green: "#1A8A5A", greenLight: "#E8F7F0",
  accent: "#F4B942", accentLight: "#FFF8E7",
  bg: "#F4F6F5", white: "#FFFFFF", card: "#FFFFFF",
  text: "#1C2E24", textMid: "#4A6355", textLight: "#8FA99A",
  border: "#D4E8DC", danger: "#E05252", dangerLight: "#FEF0F0",
  rank1: "#F4B942", rank2: "#B0BEC5", rank3: "#C4845A",
  info: "#3B82F6", infoLight: "#EFF6FF",
  orange: "#F97316", orangeLight: "#FFF3E8",
  purple: "#8B5CF6", purpleLight: "#F5F0FF",
};

const CARD_THEMES = [
  { id: "forest",   label: "Forêt",   from: "#1A8A5A", to: "#0D5C3A" },
  { id: "ocean",    label: "Océan",   from: "#1A6BAA", to: "#0A3D6B" },
  { id: "sunset",   label: "Sunset",  from: "#E05252", to: "#C4845A" },
  { id: "galaxy",   label: "Galaxie", from: "#5B3A9E", to: "#1A1A3E" },
  { id: "gold",     label: "Or",      from: "#C4845A", to: "#8B5E2A" },
  { id: "midnight", label: "Nuit",    from: "#1A1A2E", to: "#16213E" },
];

const CARD_EMOJIS = ["♻️","🌿","🌊","🔥","⚡","🌸","🎯","🦋","🌍","🎓","💎","🚀","🌙","⭐","🍃"];

const getRankColor = (i) => i === 0 ? C.rank1 : i === 1 ? C.rank2 : i === 2 ? C.rank3 : C.textLight;
const getRankIcon  = (i) => i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`;

// ─── STREAK HELPERS ───────────────────────────────────────────────
const getTodayStr = () => new Date().toISOString().split("T")[0];
const getStreakEmoji = (s) => s >= 30 ? "🔥" : s >= 14 ? "⚡" : s >= 7 ? "✨" : s >= 3 ? "🌱" : "💧";
const getStreakLabel = (s) => s >= 30 ? "Légendaire" : s >= 14 ? "En feu !" : s >= 7 ? "Super !" : s >= 3 ? "Bien parti" : "Commence !";

// ─── RFID CARD ────────────────────────────────────────────────────
function RFIDCard({ user, style }) {
  const theme = CARD_THEMES.find(t => t.id === (user.cardBg || "forest")) || CARD_THEMES[0];
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(shimmerAnim, { toValue: 1, duration: 2200, useNativeDriver: true }),
      Animated.timing(shimmerAnim, { toValue: 0, duration: 2200, useNativeDriver: true }),
    ])).start();
  }, []);
  const shimmerOpacity = shimmerAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.05, 0.18, 0.05] });
  return (
    <View style={[rfid.card, style, { backgroundColor: theme.from }]}>
      <View style={[rfid.gradientOverlay, { backgroundColor: theme.to }]} />
      <Animated.View style={[rfid.shimmer, { opacity: shimmerOpacity }]} />
      <View style={rfid.nfcRings}>
        <View style={[rfid.ring, { width: 80, height: 80, opacity: 0.15 }]} />
        <View style={[rfid.ring, { width: 55, height: 55, opacity: 0.2 }]} />
        <View style={[rfid.ring, { width: 30, height: 30, opacity: 0.25 }]} />
      </View>
      <View style={rfid.topRow}>
        <View>
          <Text style={rfid.appName}>TrashCoin</Text>
          <Text style={rfid.school}>Lycée Les Méharées</Text>
        </View>
        <Text style={{ fontSize: 28 }}>{user.cardEmoji || "♻️"}</Text>
      </View>
      <View style={rfid.chip}>
        <View style={rfid.chipLine} />
        <View style={rfid.chipLine} />
        <View style={rfid.chipLine} />
      </View>
      <Text style={rfid.idText}>{user.id.replace("_", " ")}</Text>
      <View style={rfid.bottomRow}>
        <View>
          <Text style={rfid.cardName}>{user.nom}</Text>
          <Text style={rfid.cardClass}>{user.classe}</Text>
        </View>
        <View style={rfid.pointsBadge}>
          <Text style={rfid.pointsVal}>{user.points}</Text>
          <Text style={rfid.pointsLabel}>pts</Text>
        </View>
      </View>
    </View>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────
export default function TrashCoin() {
  const [screen, setScreen] = useState("splash");
  const [currentUser, setCurrentUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [transitionTriggered, setTransitionTriggered] = useState(false);
  const splashAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim  = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    const didTransition = checkSystemTransition();
    if (didTransition) setTransitionTriggered(true);
    Animated.parallel([
      Animated.timing(splashAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setScreen("login"), 2000);
  }, []);

  
  const handleLogin = async (enteredUser, enteredPin) => {
    if (!enteredUser || !enteredPin) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const { data: user, error } = await supabase
        .from('eleves')
        .select('*')
        .eq('username', enteredUser.trim().toLowerCase())
        .single();

      if (error || !user) {
        Alert.alert("Erreur", "Nom d'utilisateur incorrect");
        return;
      }

      if (user.password === enteredPin.trim()) {
        Alert.alert("Succès", `Bienvenue, ${user.nom}!`);
        
        await AsyncStorage.setItem('user_session', JSON.stringify(user));
        setCurrentUser(user);
        
        if (user.hasChangedPassword === false) {
          setScreen("setupPin");
        } else {
          setScreen("main");
        }
        
      } else {
        Alert.alert("Erreur", "Code PIN incorrect");
      }
    } catch (err) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
      console.error(err);
    }
  };
  const updateDatabasePoints = async (userId, newPoints, newStreak, todayStr, updatedHistory) => {
    try {
      const { data, error } = await supabase
        .from('eleves')
        .update({ 
          points: newPoints,
          streak: newStreak,
          lastScanDate: todayStr,
          history: updatedHistory
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("Erreur Supabase lors de la mise à jour :", error.message);
        return;
      }

      if (data) {
        setCurrentUser(data);
        USERS_DB = USERS_DB.map(x => x.id === data.id ? data : x);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
    }
  };

  const handleLogout = () => { setCurrentUser(null); setScreen("login"); };

  if (screen === "splash")   return <SplashScreen anim={splashAnim} scale={scaleAnim} transitioned={transitionTriggered} />;
  if (screen === "login")    return <LoginScreen onLogin={handleLogin} />;
  if (screen === "setupPin") return <SetupPinScreen user={currentUser} onComplete={(u) => { setCurrentUser(u); setScreen("main"); setTab("home"); }} />;
 if (screen === "main")     return (
    <MainApp user={currentUser} tab={tab} setTab={setTab} onLogout={handleLogout}
      updateDatabasePoints={updateDatabasePoints}
      onUpdateUser={(u) => { setCurrentUser(u); USERS_DB = USERS_DB.map(x => x.id === u.id ? u : x); }} />
  );
}

// ─── SPLASH ───────────────────────────────────────────────────────
function SplashScreen({ anim, scale, transitioned }) {
  return (
    <View style={[s.flex, { backgroundColor: C.green, alignItems: "center", justifyContent: "center" }]}>
      <StatusBar barStyle="light-content" backgroundColor={C.green} />
      <Animated.View style={{ opacity: anim, transform: [{ scale }], alignItems: "center" }}>
        <Text style={{ fontSize: 60 }}>♻️</Text>
        <Text style={s.splashTitle}>{APP_NAME}</Text>
        <Text style={s.splashSub}>Lycée Les Méharées</Text>
        {transitioned && <Text style={{ color: "#fff", marginTop: 10, fontWeight: "bold" }}>🎓 Rentrée Scolaire Effectuée !</Text>}
      </Animated.View>
    </View>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const saved = await AsyncStorage.getItem('trashcoin_user');
      if (saved) { const d = JSON.parse(saved); setUsername(d.username); setPin(d.pin); setRememberMe(true); }
    } catch (e) {}
  };

  const handleLoginPress = async () => {
    setError("");
    if (!username || !pin) { setError("Remplis tous les champs."); return; }
    setLoading(true);
    
    // Call the Supabase function with the typed credentials
    await onLogin(username, pin);
    
    setLoading(false);
  };onPress={handleLoginPress}
  const updateDatabasePoints = async (userId, newPoints, newStreak, todayStr, updatedHistory) => {
    try {
      const { data, error } = await supabase
        .from('eleves')
        .update({ 
          points: newPoints,
          streak: newStreak,
          lastScanDate: todayStr,
          history: updatedHistory
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error("Erreur Supabase lors de la mise à jour :", error.message);
        return;
      }

      // Automatically updates your app's screen with the live data
      if (data) {
        setCurrentUser(data);
        USERS_DB = USERS_DB.map(x => x.id === data.id ? data : x);
      }
    } catch (err) {
      console.error("Erreur de synchronisation réseau :", err);
    }
  };

  return (
    <SafeAreaView style={[s.flex, { backgroundColor: C.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30 }}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: "center", width: "100%", maxWidth: 400 }}>
          <View style={{ marginBottom: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 50, marginBottom: 10 }}>♻️</Text>
            <Text style={s.logoTitle}>{APP_NAME}</Text>
            <Text style={s.logoSub}>Connexion Élève</Text>
          </View>
          <View style={s.formGroup}>
            <Text style={s.label}>Nom d'utilisateur</Text>
            <TextInput style={s.webInput} placeholder="ex: abeidy.abdi" placeholderTextColor={C.textLight} value={username} onChangeText={setUsername} autoCapitalize="none" />
          </View>
          <View style={s.formGroup}>
            <Text style={s.label}>Code PIN</Text>
            <TextInput style={s.webInput} placeholder="••••" placeholderTextColor={C.textLight} value={pin} onChangeText={setPin} secureTextEntry maxLength={10} keyboardType="number-pad" />
          </View>
          <View style={s.checkboxContainer}>
            <TouchableOpacity style={s.checkboxBox} onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe && <View style={s.checkboxChecked} />}
            </TouchableOpacity>
            <Text style={s.checkboxLabel} onPress={() => setRememberMe(!rememberMe)}>Se souvenir de moi</Text>
          </View>
          {error ? <Text style={s.errorText}>{error}</Text> : null}
          <TouchableOpacity style={[s.webBtn, loading && { opacity: 0.7 }]} onPress={handleLoginPress} disabled={loading}>
            <Text style={s.webBtnText}>{loading ? "Connexion..." : "Se connecter"}</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SETUP PIN ────────────────────────────────────────────────────
function SetupPinScreen({ user, onComplete }) {
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    
    // 1. Check if the PIN contains only numbers
    if (!/^\d+$/.test(newPin)) { 
      setError("Le code doit contenir uniquement des chiffres."); 
      return; 
    }
    
    // 2. Make sure it's exactly 4 digits (or whatever length you prefer)
    if (newPin.length !== 4) { 
      setError("Le code doit faire exactement 4 chiffres."); 
      return; 
    }
    
    // 3. Ensure both text fields match
    if (newPin !== confirmPin) { 
      setError("Les codes ne correspondent pas."); 
      return; 
    }

    try {
      // Update the student's password and registration state directly in Supabase
      const { data, error } = await supabase
        .from('eleves')
        .update({ 
          password: newPin.trim(), 
          hasChangedPassword: true 
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        Alert.alert("Erreur", "Impossible de sauvegarder le mot de passe dans la base de données.");
        console.error(error);
        return;
      }

      Alert.alert("Succès", "Ton code personnel est enregistré !");
      onComplete(data); 
    } catch (err) {
      Alert.alert("Erreur", "Une erreur réseau est survenue.");
    }
  };

  return (
    <SafeAreaView style={[s.flex, { backgroundColor: C.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <ScrollView contentContainerStyle={{ padding: 20, justifyContent: "center" }}>
        <View style={[s.posterCard, { alignItems: "center", padding: 30 }]}>
          <Text style={{ fontSize: 40, marginBottom: 10 }}>📢</Text>
          <Text style={s.posterTitle}>Bienvenue, {user.nom.split(" ")[0]} !</Text>
          <View style={[s.posterBox, { width: "100%", marginTop: 20, padding: 20, backgroundColor: C.white, borderRadius: 10, borderWidth: 2, borderStyle: "dashed", borderColor: C.green }]}>
            <Text style={{ fontSize: 14, color: C.textMid, textAlign: "center", marginBottom: 10 }}>C'est ta première connexion.</Text>
            <Text style={{ fontSize: 13, fontWeight: "bold", color: C.text, textAlign: "center" }}>
              Ton code par défaut est : <Text style={{ color: C.green, fontSize: 18 }}>{user.password}</Text>
            </Text>
            <Text style={{ fontSize: 12, color: C.textLight, textAlign: "center", marginTop: 5 }}>(Tu peux l'utiliser si tu veux, mais on te conseille de le changer)</Text>
          </View>
          <Text style={s.posterSubTitle}>Choisis un nouveau code secret :</Text>
          <TextInput style={s.webInput} placeholder="Nouveau Code (ex: Eco123)" value={newPin} onChangeText={setNewPin} autoCapitalize="none" maxLength={10} />
          <TextInput style={[s.webInput, { marginTop: 10 }]} placeholder="Confirmer le Code" value={confirmPin} onChangeText={setConfirmPin} autoCapitalize="none" maxLength={10} />
          {error ? <Text style={[s.errorText, { textAlign: "center" }]}>{error}</Text> : null}
          <TouchableOpacity style={[s.webBtn, { marginTop: 20, width: "100%" }]} onPress={handleSave}>
            <Text style={s.webBtnText}>Valider mon nouveau code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
function MainApp({ user, tab, setTab, onLogout, onUpdateUser, updateDatabasePoints }) { // <--- 1. Added here
  const [liveUser, setLiveUser] = useState(user);
  const updateUser = (u) => { setLiveUser(u); onUpdateUser(u); };
  const tabs = [
    { id: "home",        icon: "🏠", label: "Accueil" },
    { id: "scan",        icon: "📡", label: "Scanner" },
    { id: "leaderboard", icon: "🏆", label: "Classement" },
    { id: "profile",     icon: "👤", label: "Profil" },
  ];
  return (
    <SafeAreaView style={[s.flex, { backgroundColor: C.bg }]}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <View style={s.flex}>
        {tab === "home"        && <HomeScreen user={liveUser} />}
        {/* 2. Added right below to hand it over to your scanner screen */}
        {tab === "scan"        && <ScanScreen user={liveUser} onUpdateUser={updateUser} updateDatabasePoints={updateDatabasePoints} />}
        {tab === "leaderboard" && <LeaderboardScreen user={liveUser} />}
        {tab === "profile"     && <ProfileScreen user={liveUser} onLogout={onLogout} onUpdateUser={updateUser} />}
      </View>
      <View style={s.tabBar}>
        {tabs.map(t => (
          <TouchableOpacity key={t.id} style={s.tabBtn} onPress={() => setTab(t.id)}>
            <Text style={[s.tabIcon, tab === t.id && { transform: [{ scale: 1.2 }] }]}>{t.icon}</Text>
            <Text style={[s.tabLabel, tab === t.id && { color: C.green, fontWeight: "700" }]}>{t.label}</Text>
            {tab === t.id && <View style={s.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────
function HomeScreen({ user }) {
  const sortedUsers = [...USERS_DB].sort((a, b) => b.points - a.points);
  const rank = sortedUsers.findIndex(u => u.id === user.id) + 1;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [factIndex, setFactIndex] = useState(0);
  const factAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.04, duration: 900, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
    ])).start();
  }, []);

  // rotate eco facts every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(factAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setFactIndex(i => (i + 1) % ECO_FACTS.length);
        Animated.timing(factAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  let potentialBonus = rank === 1 ? 2 : rank === 2 ? 1 : rank === 3 ? 0.5 : 0;
  const streak = user.streak || 0;
  const fact = ECO_FACTS[factIndex];

  // streak week display (7 dots)
  const weekDots = Array.from({ length: 7 }, (_, i) => i < (streak % 7 || (streak > 0 && streak % 7 === 0 ? 7 : 0)));

  return (
    <ScrollView style={s.flex} contentContainerStyle={{ padding: 20, paddingBottom: 20 }}>
      {/* Header */}
      <View style={s.homeHeader}>
        <View>
          <Text style={s.greeting}>Bonjour, {user.nom.split(" ")[0]} 👋</Text>
          <Text style={[s.subGreeting, { color: C.textMid }]}>{user.classe}</Text>
        </View>
        <View style={s.avatarBubble}><Text style={{ fontSize: 28 }}>🎓</Text></View>
      </View>

      {/* Points hero */}
      <Animated.View style={[s.heroCard, { transform: [{ scale: pulseAnim }] }]}>
        <Text style={s.heroLabel}>Mes Points 🪙</Text>
        <Text style={s.heroPoints}>{user.points}</Text>
        <Text style={[s.heroLabel, { marginTop: 4, fontSize: 13 }]}>Classement actuel : #{rank}</Text>
        {rank <= 3 && (
          <View style={[s.badge, { backgroundColor: C.accent + "33", borderColor: C.accent, marginTop: 10 }]}>
            <Text style={[s.badgeText, { color: C.accent }]}>🏆 Bonus potentiel : +{potentialBonus} pts</Text>
          </View>
        )}
      </Animated.View>

      {/* ── STREAK CARD ── */}
      <View style={[s.card, { backgroundColor: streak >= 7 ? C.orangeLight : C.accentLight, borderColor: streak >= 7 ? C.orange + "55" : C.accent + "55" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <View>
            <Text style={[s.cardTitle, { color: streak >= 7 ? C.orange : C.accent }]}>
              {getStreakEmoji(streak)} Série du jour
            </Text>
            <Text style={{ color: C.textMid, fontSize: 12, marginTop: 2 }}>{getStreakLabel(streak)}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 32, fontWeight: "800", color: streak >= 7 ? C.orange : C.accent }}>{streak}</Text>
            <Text style={{ fontSize: 11, color: C.textLight }}>jours</Text>
          </View>
        </View>
        {/* 7-day dots */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["L","M","M","J","V","S","D"].map((day, i) => (
            <View key={i} style={{ alignItems: "center" }}>
              <View style={[
                streak_s.dot,
                { backgroundColor: weekDots[i] ? (streak >= 7 ? C.orange : C.accent) : C.border }
              ]} />
              <Text style={{ fontSize: 9, color: C.textLight, marginTop: 3 }}>{day}</Text>
            </View>
          ))}
        </View>
        {streak === 0 && (
          <Text style={{ fontSize: 12, color: C.textMid, marginTop: 10, textAlign: "center" }}>
            Scanne un déchet aujourd'hui pour commencer ta série ! 🚀
          </Text>
        )}
      </View>

      {/* ── SENSOR STATUS (always active) ── */}
      <View style={[s.card, { backgroundColor: C.greenLight, borderColor: C.green + "44" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={sensor_s.activeDot} />
              <Text style={[s.cardTitle, { color: C.green, marginLeft: 8, marginBottom: 0 }]}>Capteur Actif</Text>
            </View>
            <Text style={{ color: C.textMid, fontSize: 12, marginTop: 4 }}>
              PIR + Ultrason en ligne · Anti-triche ON
            </Text>
          </View>
          <Text style={{ fontSize: 28 }}>🤖</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <View style={[sensor_s.chip, { backgroundColor: C.green + "22" }]}>
            <Text style={[sensor_s.chipText, { color: C.green }]}>📡 PIR</Text>
          </View>
          <View style={[sensor_s.chip, { backgroundColor: C.green + "22", marginLeft: 8 }]}>
            <Text style={[sensor_s.chipText, { color: C.green }]}>📏 Ultrason</Text>
          </View>
          <View style={[sensor_s.chip, { backgroundColor: C.green + "22", marginLeft: 8 }]}>
            <Text style={[sensor_s.chipText, { color: C.green }]}>🛡️ Anti-triche</Text>
          </View>
        </View>
      </View>

      {/* ── ECO FACT ── */}
      <View style={[s.card, { borderColor: fact.color + "44", overflow: "hidden" }]}>
        <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 4, backgroundColor: fact.color, borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }} />
        <Text style={[s.cardTitle, { color: fact.color, marginLeft: 4 }]}>💡 Le savais-tu ?</Text>
        <Animated.View style={{ opacity: factAnim, marginLeft: 4, marginTop: 4 }}>
          <Text style={{ fontSize: 28, marginBottom: 6 }}>{fact.icon}</Text>
          <Text style={{ color: C.textMid, fontSize: 13, lineHeight: 19 }}>{fact.fact}</Text>
        </Animated.View>
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
          {ECO_FACTS.map((_, i) => (
            <View key={i} style={[fact_s.pageDot, { backgroundColor: i === factIndex ? fact.color : C.border }]} />
          ))}
        </View>
      </View>

      {/* Quick stats */}
      <View style={{ flexDirection: "row" }}>
        <View style={[s.card, { flex: 1, marginRight: 8, alignItems: "center" }]}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: C.green }}>{user.history?.length || 0}</Text>
          <Text style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>Dépôts total</Text>
        </View>
        <View style={[s.card, { flex: 1, alignItems: "center" }]}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: C.purple }}>{Math.floor(user.points * 0.05 * 10) / 10} kg</Text>
          <Text style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>CO₂ évité</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// ─── SCAN SCREEN ──────────────────────────────────────────────────
function ScanScreen({ user, onUpdateUser, updateDatabasePoints }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [resultDetails, setResultDetails] = useState(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);

  const frontInterp = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  const backInterp = flipAnim.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] });

  const flipCard = () => {
    Animated.spring(flipAnim, { toValue: flipped ? 0 : 1, friction: 7, useNativeDriver: true }).start();
    setFlipped(!flipped);
  };

  // ÉTAPE 1 : L'élève dit à l'application qu'il est prêt à déposer
  const handleInitiateScan = () => {
    setStatus("waiting_for_sensor");
    setMessage("Approchez votre téléphone ou votre carte RFID du capteur... 📡");
    setResultDetails(null);
  };

  // ÉTAPE 2 : Action déclenchée UNIQUEMENT quand le capteur détecte physiquement le rapprochement
  const handleSensorDetected = () => {
    setStatus("scanning");
    setMessage("Signal RFID détecté ! Analyse des capteurs... ⚡");

    setTimeout(() => {
      setMessage("Vérification PIR (Mouvement)... 🤚");
      setTimeout(() => {
        setMessage("Mesure Vitesse (Ultrason)... ⏱️");
        setTimeout(() => {
          const speed = (Math.random() * 6 + 0.5).toFixed(2);
          if (speed < 1.5) {
            setStatus("error");
            setMessage("⚠️ Triche détectée ! Vitesse trop faible.");
          } else if (speed > 5.5) {
            setStatus("error");
            setMessage("⚠️ Objet lourd refusé !");
          } else {
            setStatus("success");
            setMessage("✅ Déchet validé ! Points accordés.");
            
            const today = getTodayStr();
            const lastDate = user.lastScanDate;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];
            
            let newStreak = user.streak || 0;
            if (lastDate === today) {
              /* Même jour */
            } else if (lastDate === yesterdayStr) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }

            const updatedPoints = user.points + 1;
            const newHistoryItem = { date: new Date().toLocaleTimeString(), pts: 1 };
            const updatedHistory = [newHistoryItem, ...(user.history || [])].slice(0, 10);

            // Met à jour la base de données Supabase
            updateDatabasePoints(user.id, updatedPoints, newStreak, today, updatedHistory);
            setResultDetails({ pts: 1, total: updatedPoints, streak: newStreak });

            setTimeout(() => {
              setStatus("idle");
              setMessage("");
            }, 3500);
          }
        }, 1200);
      }, 1000);
    }, 900);
  };

  return (
    <ScrollView style={s.flex} contentContainerStyle={{ padding: 20, alignItems: "center" }}>
      <Text style={s.screenTitle}>Ma Carte RFID</Text>
      <Text style={[s.screenSub, { marginBottom: 20 }]}>Scanne ta carte pour déposer un déchet</Text>
      
      <TouchableOpacity onPress={flipCard} activeOpacity={0.95} style={{ marginBottom: 6 }}>
        <View style={{ width: width - 40, height: 210 }}>
          <Animated.View style={[{ position: "absolute", width: "100%", height: "100%" }, { transform: [{ rotateY: frontInterp }], backfaceVisibility: "hidden" }]}>
            <RFIDCard user={user} />
          </Animated.View>
          <Animated.View style={[{ position: "absolute", width: "100%", height: "100%" }, { transform: [{ rotateY: backInterp }], backfaceVisibility: "hidden" }]}>
            <View style={[rfid.card, { backgroundColor: "#111", justifyContent: "center", alignItems: "center" }]}>
              <View style={{ width: "100%", height: 40, backgroundColor: "#222", marginBottom: 20 }} />
              <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 4, width: "80%" }}>
                <Text style={{ color: "#111", fontSize: 11, letterSpacing: 2 }}>{user.id} {user.username}</Text>
              </View>
              <Text style={{ color: "#888", fontSize: 11, marginTop: 16 }}>Retourner pour voir la face</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
      
      <Text style={{ color: C.textLight, fontSize: 12, marginBottom: 20 }}>Appuie sur la carte pour la retourner</Text>

      <View style={[s.scanArea, { borderColor: status === "error" ? C.danger : status === "success" ? C.green : C.border, marginBottom: 16 }]}>
        
        {/* ÉTAT INITIAL : L'élève doit d'abord manifester son intention de scanner */}
        {status === "idle" && (
          <TouchableOpacity style={s.bigBtn} onPress={handleInitiateScan}>
            <Text style={{ fontSize: 50, marginBottom: 8 }}>📡</Text>
            <Text style={s.bigBtnText}>COMMENCER LE DÉPÔT</Text>
            <Text style={{ color: C.textLight, fontSize: 12, marginTop: 4 }}>Préparez votre déchet</Text>
          </TouchableOpacity>
        )}

        {/* ÉTAT EN ATTENTE : Bloqué tant qu'on n'a pas rapproché le téléphone du vrai capteur */}
        {status === "waiting_for_sensor" && (
          <View style={{ alignItems: "center", padding: 10 }}>
            <ActivityIndicator size="large" color={C.accent} />
            <Text style={[s.loadingText, { marginTop: 16, color: C.text, textAlign: "center", fontWeight: "600" }]}>
              {message}
            </Text>
            
            {/* Ce bouton simule l'action physique du capteur ou de la carte RFID approchée */}
            <TouchableOpacity 
              style={[s.webBtn, { marginTop: 20, backgroundColor: C.accent, paddingHorizontal: 20 }]} 
              onPress={handleSensorDetected}
            >
              <Text style={s.webBtnText}>[Simuler] Rapprocher du Capteur 🛒</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 15 }} onPress={() => { setStatus("idle"); setMessage(""); }}>
              <Text style={{ color: C.danger, fontSize: 13, fontWeight: "bold" }}>Annuler</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ÉTAT DE SCAN ET VÉRIFICATION DES SENSORS (Pas de points ajoutés ici tant que ce n'est pas fini) */}
        {status === "scanning" && (
          <View style={{ alignItems: "center" }}>
            <ActivityIndicator size="large" color={C.green} />
            <Text style={[s.loadingText, { marginTop: 16, textAlign: "center" }]}>{message}</Text>
          </View>
        )}

        {/* ÉTAT DE RÉUSSITE OU ÉCHEC */}
        {(status === "success" || status === "error") && (
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 50, marginBottom: 10 }}>{status === "success" ? "🎉" : "❌"}</Text>
            <Text style={[s.loadingText, { textAlign: "center", fontWeight: "bold", color: status === "success" ? C.green : C.danger }]}>
              {message}
            </Text>
            {resultDetails && status === "success" && (
              <Text style={{ marginTop: 8, color: C.textMid, fontSize: 13 }}>
                +1 TrashCoin accumulé ! Total : {resultDetails.total} pts
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

// ─── CUSTOMIZE MODAL ─────────────────────────────────────────────
function CustomizeModal({ visible, user, onClose, onSave }) {
  const [selectedTheme, setSelectedTheme] = useState(user.cardBg || "forest");
  const [selectedEmoji, setSelectedEmoji] = useState(user.cardEmoji || "♻️");
  const previewUser = { ...user, cardBg: selectedTheme, cardEmoji: selectedEmoji };
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={cust.overlay}>
        <ScrollView>
          <View style={cust.sheet}>
            <View style={cust.handle} />
            <Text style={cust.title}>🎨 Personnaliser ma carte</Text>
            <RFIDCard user={previewUser} style={{ marginBottom: 20, alignSelf: "center" }} />
            <Text style={cust.sectionLabel}>Couleur</Text>
            <View style={cust.themeRow}>
              {CARD_THEMES.map(t => (
                <TouchableOpacity key={t.id} style={[cust.themeBtn, { backgroundColor: t.from }, selectedTheme === t.id && cust.themeBtnActive]} onPress={() => setSelectedTheme(t.id)}>
                  {selectedTheme === t.id && <Text style={{ color: "#fff", fontSize: 14 }}>✓</Text>}
                  <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 10, marginTop: 2 }}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={cust.sectionLabel}>Emoji</Text>
            <View style={cust.emojiGrid}>
              {CARD_EMOJIS.map(e => (
                <TouchableOpacity key={e} style={[cust.emojiBtn, selectedEmoji === e && cust.emojiBtnActive]} onPress={() => setSelectedEmoji(e)}>
                  <Text style={{ fontSize: 22 }}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[s.webBtn, { marginTop: 16 }]} onPress={() => onSave({ cardBg: selectedTheme, cardEmoji: selectedEmoji })}>
              <Text style={s.webBtnText}>💾 Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.webBtn, { backgroundColor: C.bg, marginTop: 8 }]} onPress={onClose}>
              <Text style={[s.webBtnText, { color: C.textMid }]}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

// ─── LEADERBOARD SCREEN (2 tabs: classe + établissement) ──────────
function LeaderboardScreen({ user }) {
  const [activeTab, setActiveTab] = useState("classe");

  const classeSorted = [...USERS_DB]
    .filter(u => u.classe === user.classe)
    .sort((a, b) => b.points - a.points);

  // Simulate multiple classes for établissement ranking
  const etablissementData = [
    { classe: "2nde Opaline", total: USERS_DB.filter(u => u.classe === "2nde Opaline").reduce((s, u) => s + u.points, 0), count: 27 },
    { classe: "2nde Saphir", total: 142, count: 25 },
    { classe: "1ère Topaze", total: 98, count: 24 },
    { classe: "1ère Rubis", total: 76, count: 26 },
    { classe: "Terminale Jade", total: 55, count: 23 },
  ].sort((a, b) => b.total - a.total);

  return (
    <View style={s.flex}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <Text style={s.screenTitle}>🏆 Classement</Text>
        <Text style={[s.screenSub, { marginBottom: 14 }]}>Bonus fin de période : 1er (+2), 2e (+1), 3e (+0.5)</Text>

        {/* Tab switcher */}
        <View style={lb_s.tabSwitch}>
          <TouchableOpacity
            style={[lb_s.switchBtn, activeTab === "classe" && lb_s.switchBtnActive]}
            onPress={() => setActiveTab("classe")}
          >
            <Text style={[lb_s.switchText, activeTab === "classe" && lb_s.switchTextActive]}>🎓 Ma Classe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[lb_s.switchBtn, activeTab === "etab" && lb_s.switchBtnActive]}
            onPress={() => setActiveTab("etab")}
          >
            <Text style={[lb_s.switchText, activeTab === "etab" && lb_s.switchTextActive]}>🏫 Établissement</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === "classe" ? (
        <FlatList
          data={classeSorted}
          keyExtractor={u => u.id}
          ListHeaderComponent={() => (
            <>
              {classeSorted.length >= 3 && (
                <View style={s.podium}>
                  {[classeSorted[1], classeSorted[0], classeSorted[2]].map((u, pi) => {
                    const realRank = pi === 0 ? 1 : pi === 1 ? 0 : 2;
                    const heights = [80, 110, 60];
                    const bonus = realRank === 0 ? "+2" : realRank === 1 ? "+1" : "+0.5";
                    return (
                      <View key={u.id} style={[s.podiumItem, { height: heights[pi] + 60 }]}>
                        <Text style={{ fontSize: 26 }}>{getRankIcon(realRank)}</Text>
                        <Text style={[s.podiumName, u.id === user.id && { color: C.green }]} numberOfLines={1}>{u.nom.split(" ")[0]}</Text>
                        <Text style={s.podiumPts}>{u.points} pts</Text>
                        <View style={[s.podiumBlock, { height: heights[pi], backgroundColor: getRankColor(realRank) + "33" }]}>
                          <Text style={{ fontSize: 16, fontWeight: "700", color: getRankColor(realRank) }}>{bonus}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
              <Text style={lb_s.listHeader}>Classement complet — {user.classe}</Text>
            </>
          )}
          contentContainerStyle={{ padding: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          renderItem={({ item: u, index }) => (
            <View style={[s.leaderRow, u.id === user.id && { borderColor: C.green, backgroundColor: C.greenLight }]}>
              <View style={[s.rankCircle, { backgroundColor: getRankColor(index) + "22" }]}>
                <Text style={{ fontWeight: "700", color: getRankColor(index), fontSize: index < 3 ? 16 : 14 }}>{getRankIcon(index)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.leaderName, u.id === user.id && { color: C.green }]}>{u.nom} {u.id === user.id ? "(Toi)" : ""}</Text>
                <Text style={s.leaderClass}>🔥 Série : {u.streak || 0}j</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={s.leaderPts}>{u.points}</Text>
                <Text style={{ color: C.textLight, fontSize: 11 }}>points</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={lb_s.listHeader}>Classes de Lycée Les Méharées</Text>

          {etablissementData.map((cls, index) => {
            const isMyClass = cls.classe === user.classe;
            const avg = cls.count > 0 ? (cls.total / cls.count).toFixed(1) : 0;
            return (
              <View key={cls.classe} style={[s.leaderRow, { marginBottom: 8 }, isMyClass && { borderColor: C.green, backgroundColor: C.greenLight }]}>
                <View style={[s.rankCircle, { backgroundColor: getRankColor(index) + "22" }]}>
                  <Text style={{ fontWeight: "700", color: getRankColor(index), fontSize: index < 3 ? 16 : 14 }}>{getRankIcon(index)}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[s.leaderName, isMyClass && { color: C.green }]}>
                    {cls.classe} {isMyClass ? "⭐" : ""}
                  </Text>
                  <Text style={s.leaderClass}>Moy. {avg} pts/élève · {cls.count} élèves</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={s.leaderPts}>{cls.total}</Text>
                  <Text style={{ color: C.textLight, fontSize: 11 }}>pts total</Text>
                </View>
              </View>
            );
          })}

          <View style={[s.card, { backgroundColor: C.infoLight, borderColor: C.info + "44", marginTop: 8 }]}>
            <Text style={{ color: C.info, fontSize: 13, fontWeight: "600", textAlign: "center" }}>
              📊 Mise à jour en temps réel · {USERS_DB.length} élèves inscrits
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

// ─── PROFILE SCREEN ───────────────────────────────────────────────
function ProfileScreen({ user, onLogout, onUpdateUser }) {
  const [showChangePin, setShowChangePin] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");

  const notifications  = user.notifications  !== false;
  const soundEnabled   = user.soundEnabled    !== false;

  const toggleNotif  = () => onUpdateUser({ ...user, notifications: !notifications });
  const toggleSound  = () => onUpdateUser({ ...user, soundEnabled: !soundEnabled });

  const handleChangePin = () => {
    setPinError("");
    if (currentPin !== user.password) { setPinError("Code actuel incorrect."); return; }
    if (!/[a-zA-Z]/.test(newPin) || !/[0-9]/.test(newPin)) { setPinError("Le nouveau code doit contenir lettres ET chiffres."); return; }
    if (newPin.length < 4) { setPinError("Minimum 4 caractères."); return; }
    if (newPin !== confirmPin) { setPinError("Les codes ne correspondent pas."); return; }
    onUpdateUser({ ...user, password: newPin });
    setShowChangePin(false);
    setCurrentPin(""); setNewPin(""); setConfirmPin("");
    Alert.alert("✅ Succès", "Ton code a bien été modifié !");
  };

  const convertPointsToGrade = () => {
    if (user.points < 10) { Alert.alert("❌ Points insuffisants", "Il te faut au moins 10 points."); return; }
    Alert.alert("🎁 Échange de Points", "Échanger 10 points contre un bonus de note ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Confirmer", onPress: () => { onUpdateUser({ ...user, points: user.points - 10 }); Alert.alert("✅ Succès", "10 points échangés contre +0.5/20 !"); } }
    ]);
  };

  const sortedUsers = [...USERS_DB].sort((a, b) => b.points - a.points);
  const rank = sortedUsers.findIndex(u => u.id === user.id) + 1;

  return (
    <ScrollView style={s.flex} contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
      <Text style={s.screenTitle}>Mon Profil</Text>

      {/* Identity card */}
      <View style={[s.card, { alignItems: "center", paddingVertical: 24 }]}>
        <View style={prof_s.avatar}>
          <Text style={{ fontSize: 36 }}>🎓</Text>
        </View>
        <Text style={[s.profileName, { textAlign: "center", marginTop: 12 }]}>{user.nom}</Text>
        <Text style={[s.profileClass, { textAlign: "center" }]}>{user.classe}</Text>
        <View style={{ flexDirection: "row", marginTop: 16 }}>
          <View style={[prof_s.statPill, { backgroundColor: C.greenLight }]}>
            <Text style={[prof_s.statPillVal, { color: C.green }]}>{user.points}</Text>
            <Text style={[prof_s.statPillLabel, { color: C.green + "99" }]}>Points</Text>
          </View>
          <View style={[prof_s.statPill, { backgroundColor: C.orangeLight, marginHorizontal: 8 }]}>
            <Text style={[prof_s.statPillVal, { color: C.orange }]}>{user.streak || 0}</Text>
            <Text style={[prof_s.statPillLabel, { color: C.orange + "99" }]}>Jours</Text>
          </View>
          <View style={[prof_s.statPill, { backgroundColor: C.infoLight }]}>
            <Text style={[prof_s.statPillVal, { color: C.info }]}>#{rank}</Text>
            <Text style={[prof_s.statPillLabel, { color: C.info + "99" }]}>Rang</Text>
          </View>
        </View>
      </View>

      {/* Rewards */}
      <Text style={prof_s.sectionTitle}>🎁 Récompenses</Text>
      <TouchableOpacity style={[s.card, s.actionRow]} onPress={convertPointsToGrade}>
        <Text style={{ fontSize: 24 }}>📝</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.actionRowText}>Échanger contre Bonus Note</Text>
          <Text style={{ color: C.textLight, fontSize: 12 }}>10 pts → +0.5/20</Text>
        </View>
        <View style={[prof_s.costBadge, { backgroundColor: C.greenLight }]}>
          <Text style={{ color: C.green, fontWeight: "700", fontSize: 12 }}>10 pts</Text>
        </View>
      </TouchableOpacity>

      {/* Preferences */}
      <Text style={prof_s.sectionTitle}>⚙️ Préférences</Text>
      <View style={s.card}>
        {/* Notifications */}
        <View style={prof_s.settingRow}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Notifications</Text>
              <Text style={prof_s.settingDesc}>Rappels quotidiens de scan</Text>
            </View>
          </View>
          <Switch value={notifications} onValueChange={toggleNotif} trackColor={{ true: C.green }} thumbColor={C.white} />
        </View>
        <View style={prof_s.divider} />
        {/* Sound */}
        <View style={prof_s.settingRow}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>🔊</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Sons</Text>
              <Text style={prof_s.settingDesc}>Effets sonores lors du scan</Text>
            </View>
          </View>
          <Switch value={soundEnabled} onValueChange={toggleSound} trackColor={{ true: C.green }} thumbColor={C.white} />
        </View>
      </View>

      {/* Account */}
      <Text style={prof_s.sectionTitle}>🔐 Compte</Text>
      <View style={s.card}>
        {/* Username display */}
        <View style={[prof_s.settingRow, { paddingVertical: 4 }]}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>👤</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Identifiant</Text>
              <Text style={prof_s.settingDesc}>{user.username}</Text>
            </View>
          </View>
        </View>
        <View style={prof_s.divider} />
        {/* Change PIN */}
        <TouchableOpacity style={prof_s.settingRow} onPress={() => setShowChangePin(!showChangePin)}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>🔑</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Changer mon code</Text>
              <Text style={prof_s.settingDesc}>Modifier le code de connexion</Text>
            </View>
          </View>
          <Text style={{ color: C.green, fontWeight: "700" }}>{showChangePin ? "▲" : "▶"}</Text>
        </TouchableOpacity>

        {showChangePin && (
          <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: C.border }}>
            <TextInput style={[s.webInput, { marginBottom: 8 }]} placeholder="Code actuel" value={currentPin} onChangeText={setCurrentPin} secureTextEntry autoCapitalize="none" />
            <TextInput style={[s.webInput, { marginBottom: 8 }]} placeholder="Nouveau code (ex: Eco123)" value={newPin} onChangeText={setNewPin} autoCapitalize="none" />
            <TextInput style={[s.webInput, { marginBottom: 8 }]} placeholder="Confirmer le nouveau code" value={confirmPin} onChangeText={setConfirmPin} autoCapitalize="none" />
            {pinError ? <Text style={s.errorText}>{pinError}</Text> : null}
            <TouchableOpacity style={[s.webBtn, { marginTop: 8 }]} onPress={handleChangePin}>
              <Text style={s.webBtnText}>Valider</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* About */}
      <Text style={prof_s.sectionTitle}>ℹ️ À propos</Text>
      <View style={s.card}>
        <View style={[prof_s.settingRow, { paddingVertical: 4 }]}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>📱</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>TrashCoin</Text>
              <Text style={prof_s.settingDesc}>Version 1.0.0</Text>
            </View>
          </View>
        </View>
        <View style={prof_s.divider} />
        <View style={[prof_s.settingRow, { paddingVertical: 4 }]}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>🏫</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Lycée Les Méharées</Text>
              <Text style={prof_s.settingDesc}>Nouakchott, Mauritanie</Text>
            </View>
          </View>
        </View>
        <View style={prof_s.divider} />
        <TouchableOpacity style={[prof_s.settingRow, { paddingVertical: 4 }]} onPress={() => Alert.alert("Politique de confidentialité", "Tes données sont stockées localement sur cet appareil et ne sont jamais partagées avec des tiers.")}>
          <View style={prof_s.settingLeft}>
            <Text style={{ fontSize: 20 }}>🔒</Text>
            <View style={{ marginLeft: 12 }}>
              <Text style={prof_s.settingLabel}>Confidentialité</Text>
              <Text style={prof_s.settingDesc}>Voir la politique</Text>
            </View>
          </View>
          <Text style={{ color: C.textLight }}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={[s.webBtn, { backgroundColor: C.dangerLight, marginTop: 8 }]} onPress={onLogout}>
        <Text style={[s.webBtnText, { color: C.danger }]}>🚪 Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── RFID STYLES ──────────────────────────────────────────────────
const rfid = StyleSheet.create({
  card: { width: width - 40, height: 210, borderRadius: 18, padding: 22, overflow: "hidden", justifyContent: "space-between", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 18, elevation: 10 },
  gradientOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", opacity: 0.5, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
  shimmer: { position: "absolute", top: 0, left: "-30%", width: "40%", height: "100%", backgroundColor: "#fff", transform: [{ skewX: "-20deg" }] },
  nfcRings: { position: "absolute", right: 20, top: "50%", marginTop: -40, alignItems: "center", justifyContent: "center" },
  ring: { position: "absolute", borderRadius: 100, borderWidth: 2, borderColor: "#fff" },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  appName: { color: "#fff", fontSize: 16, fontWeight: "800", letterSpacing: 1 },
  school: { color: "rgba(255,255,255,0.65)", fontSize: 10, marginTop: 2 },
  chip: { width: 42, height: 32, backgroundColor: "#D4AF37", borderRadius: 6, padding: 5, justifyContent: "space-between", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 4 },
  chipLine: { height: 2, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 1 },
  idText: { color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: 3 },
  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  cardName: { color: "#fff", fontSize: 15, fontWeight: "700", letterSpacing: 0.5 },
  cardClass: { color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 2 },
  pointsBadge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, padding: 8, alignItems: "center", minWidth: 50, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  pointsVal: { color: "#fff", fontSize: 18, fontWeight: "800" },
  pointsLabel: { color: "rgba(255,255,255,0.7)", fontSize: 10 },
});

// ─── CUSTOMIZE STYLES ─────────────────────────────────────────────
const cust = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: Platform.OS === "ios" ? 40 : 24 },
  handle: { width: 40, height: 4, backgroundColor: C.border, borderRadius: 2, alignSelf: "center", marginBottom: 16 },
  title: { fontSize: 20, fontWeight: "800", color: C.text, textAlign: "center", marginBottom: 20 },
  sectionLabel: { fontSize: 13, fontWeight: "700", color: C.textMid, marginBottom: 10, marginTop: 4 },
  themeRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  themeBtn: { width: (width - 48 - 40) / 6, aspectRatio: 1, borderRadius: 10, margin: 3, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "transparent" },
  themeBtnActive: { borderColor: C.text, transform: [{ scale: 1.1 }] },
  emojiGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 8 },
  emojiBtn: { width: (width - 48 - 24) / 8, aspectRatio: 1, borderRadius: 10, margin: 2, alignItems: "center", justifyContent: "center", backgroundColor: C.bg, borderWidth: 2, borderColor: "transparent" },
  emojiBtnActive: { borderColor: C.green, backgroundColor: C.greenLight },
});

// ─── LEADERBOARD STYLES ───────────────────────────────────────────
const lb_s = StyleSheet.create({
  tabSwitch: { flexDirection: "row", backgroundColor: C.bg, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: C.border },
  switchBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 9 },
  switchBtnActive: { backgroundColor: C.white, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 4, elevation: 2 },
  switchText: { fontSize: 13, fontWeight: "600", color: C.textLight },
  switchTextActive: { color: C.green },
  listHeader: { fontSize: 13, fontWeight: "700", color: C.textMid, marginBottom: 10, marginTop: 4 },
});

// ─── PROFILE STYLES ───────────────────────────────────────────────
const prof_s = StyleSheet.create({
  avatar: { width: 70, height: 70, borderRadius: 20, backgroundColor: C.greenLight, alignItems: "center", justifyContent: "center" },
  statPill: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10, alignItems: "center" },
  statPillVal: { fontSize: 20, fontWeight: "800" },
  statPillLabel: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: C.textMid, marginBottom: 8, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.8 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10 },
  settingLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  settingLabel: { fontSize: 14, fontWeight: "600", color: C.text },
  settingDesc: { fontSize: 12, color: C.textLight, marginTop: 1 },
  divider: { height: 1, backgroundColor: C.border, marginVertical: 2 },
  costBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
});

// ─── STREAK / FACT / SENSOR STYLES ───────────────────────────────
const streak_s = StyleSheet.create({ dot: { width: 26, height: 26, borderRadius: 8 } });
const fact_s   = StyleSheet.create({ pageDot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 2 } });
const sensor_s = StyleSheet.create({
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.green, shadowColor: C.green, shadowOpacity: 0.8, shadowRadius: 4 },
  chip: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginRight: 4 },
  chipText: { fontSize: 11, fontWeight: "600" },
});

// ─── MAIN STYLES ──────────────────────────────────────────────────
const s = StyleSheet.create({
  flex: { flex: 1 },
  splashTitle: { fontSize: 42, fontWeight: "800", color: "#fff", marginTop: 20 },
  splashSub: { fontSize: 15, color: "rgba(255,255,255,0.8)", marginTop: 8 },
  logoTitle: { fontSize: 34, fontWeight: "800", color: C.text, marginBottom: 5 },
  logoSub: { fontSize: 16, color: C.textMid },
  formGroup: { width: "100%", marginBottom: 15 },
  label: { fontSize: 14, fontWeight: "600", color: C.textMid, marginBottom: 5 },
  webInput: { backgroundColor: C.white, borderRadius: 8, padding: 12, fontSize: 16, borderWidth: 1, borderColor: C.border, width: "100%" },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 15, width: "100%" },
  checkboxBox: { width: 20, height: 20, borderWidth: 2, borderColor: C.textMid, borderRadius: 4, marginRight: 10, justifyContent: "center", alignItems: "center" },
  checkboxChecked: { width: 12, height: 12, backgroundColor: C.green, borderRadius: 2 },
  checkboxLabel: { fontSize: 14, color: C.textMid },
  webBtn: { backgroundColor: C.green, borderRadius: 8, paddingVertical: 14, width: "100%", alignItems: "center", justifyContent: "center", marginTop: 10 },
  webBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  errorText: { color: C.danger, fontSize: 13, marginTop: 10, textAlign: "center" },
  posterCard: { backgroundColor: C.card, borderRadius: 12, borderWidth: 1, borderColor: C.border, elevation: 4 },
  posterTitle: { fontSize: 22, fontWeight: "800", color: C.text, textAlign: "center" },
  posterBox: { alignItems: "center" },
  posterSubTitle: { fontSize: 16, fontWeight: "600", color: C.text, marginTop: 25, marginBottom: 10, textAlign: "center" },
  tabBar: { flexDirection: "row", backgroundColor: C.white, borderTopWidth: 1, borderTopColor: C.border, paddingBottom: Platform.OS === "ios" ? 20 : 10, paddingTop: 10 },
  tabBtn: { flex: 1, alignItems: "center", position: "relative", paddingBottom: 4 },
  tabIcon: { fontSize: 24 },
  tabLabel: { fontSize: 11, color: C.textLight, fontWeight: "600", marginTop: 4 },
  tabIndicator: { position: "absolute", bottom: 0, width: 4, height: 4, borderRadius: 2, backgroundColor: C.green },
  homeHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  greeting: { fontSize: 24, fontWeight: "800", color: C.text },
  subGreeting: { fontSize: 14, marginTop: 2 },
  avatarBubble: { width: 50, height: 50, borderRadius: 16, backgroundColor: C.greenLight, alignItems: "center", justifyContent: "center" },
  heroCard: { backgroundColor: C.green, borderRadius: 22, padding: 24, marginBottom: 16, alignItems: "center" },
  heroLabel: { color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "600", textAlign: "center" },
  heroPoints: { color: "#fff", fontSize: 48, fontWeight: "800", marginVertical: 8 },
  statCard: { borderRadius: 12, padding: 12, alignItems: "center" },
  statValue: { fontSize: 22, fontWeight: "800" },
  statLabel: { fontSize: 12, fontWeight: "600" },
  card: { backgroundColor: C.card, borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: C.border },
  cardTitle: { fontSize: 16, fontWeight: "700", color: C.text, marginBottom: 8 },
  badge: { borderRadius: 10, padding: 10, borderWidth: 1, alignItems: "center" },
  badgeText: { fontSize: 13, fontWeight: "700" },
  scanArea: { width: width - 40, height: 220, borderRadius: 20, backgroundColor: C.card, borderWidth: 3, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  bigBtn: { alignItems: "center" },
  bigBtnText: { fontSize: 20, fontWeight: "700", color: C.green },
  loadingText: { fontSize: 15, color: C.textMid, textAlign: "center", fontWeight: "600" },
  resultTitle: { fontSize: 22, fontWeight: "800", color: C.green, marginTop: 10 },
  resultSub: { fontSize: 13, color: C.textMid, textAlign: "center", marginHorizontal: 20, marginTop: 5 },
  resultTotal: { fontSize: 18, fontWeight: "700", color: C.text, marginTop: 10 },
  podium: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", paddingHorizontal: 10, marginBottom: 10 },
  podiumItem: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  podiumName: { fontSize: 11, fontWeight: "700", color: C.text, marginTop: 4, paddingHorizontal: 2 },
  podiumPts: { fontSize: 12, fontWeight: "600", color: C.textMid, marginBottom: 4 },
  podiumBlock: { width: "100%", borderRadius: 8, alignItems: "center", justifyContent: "center" },
  leaderRow: { flexDirection: "row", alignItems: "center", backgroundColor: C.card, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.border },
  rankCircle: { width: 32, height: 32, borderRadius: 8, alignItems: "center", justifyContent: "center", marginRight: 10 },
  leaderName: { fontSize: 14, fontWeight: "700", color: C.text },
  leaderClass: { fontSize: 12, color: C.textLight },
  leaderPts: { fontSize: 18, fontWeight: "800", color: C.green },
  profileName: { fontSize: 20, fontWeight: "800", color: C.text },
  profileClass: { color: C.textMid, fontSize: 14, marginTop: 2 },
  actionRow: { flexDirection: "row", alignItems: "center" },
  actionRowText: { flex: 1, fontSize: 15, fontWeight: "600", color: C.text },
  screenTitle: { fontSize: 28, fontWeight: "800", color: C.text, marginBottom: 4 },
  screenSub: { fontSize: 14, color: C.textLight },
});
