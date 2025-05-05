import {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  AuthScreenNavigationProp,
  AuthStackParamList,
} from '../../types/navigationTypes';
import CustomButton from '../../components/CustomButton';
import BackButton from '../../components/BackButton';
import {CameraView, useCameraPermissions} from 'expo-camera';
import {useForm} from 'react-hook-form';
import {RegisterStep3Data} from '../../types/user';
import {Ionicons} from '@expo/vector-icons';
import {PictureTakingModal} from '../../components/PictureTakingModal';

{
  /* Kuvan ottaminen homma tässä */
}

{
  /*
      <View className="h-[50%]">
        <CameraView
          style={{height: 300}}
          facing="back"
          mode="picture"
          ref={ref}
        ></CameraView>
        <CustomButton
          className="bg-secondary mt-2 mx-auto"
          onPress={takePicture}
        >
          <Text className="text-white">Take a picture</Text>
        </CustomButton>
      </View> */
}

const RegisterStep3 = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterStep3'>>();

  const ref = useRef<CameraView>(null);
  const [uri1, setUri1] = useState<string | undefined>(undefined);
  const [uri2, setUri2] = useState<string | undefined>(undefined);
  const [base64Front, setBase64Front] = useState<string | undefined>(undefined);
  const [base64Back, setBase64Back] = useState<string | undefined>(undefined);
  const [side, setSide] = useState<'front' | 'back' | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const step2Data = route.params?.step2Data || {};
  const initValues = {
    emailOrPhone: step2Data.emailOrPhone || '',
    password: step2Data.password || '',
    firstName: step2Data.firstName || '',
    lastName: step2Data.lastName || '',
    phone: step2Data.phone || '',
    postalCode: step2Data.postalCode || '',
    address: step2Data.address || '',
    frontImage: '',
    backImage: '',
  };
  const {control, handleSubmit} = useForm<RegisterStep3Data>({
    defaultValues: initValues,
  });

  const onSubmit = async () => {
    console.log('step2Data: ', step2Data);
    const allData = {
      ...step2Data,
      frontImage: base64Front,
      backImage: base64Back,
    };
    console.log('allData: ', allData);

    if (!uri1 || !uri2) {
      Alert.alert('Ota kuvat ajokortin molemmista puolista');
      return;
    }

    console.log('data: ', allData);
    navigation.navigate('RegisterStep4', {step3Data: allData});
  };

  if (!permission) {
    console.log('Camera permission is null');

    // Camera permissions are still loading.
    return (
      <View>
        <Text className="text-lg text-center">
          Loading camera permission...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    console.log('Camera permission is not granted');
    // Camera permissions are not granted yet.
    return (
      <View className=" w-full h-full bg-white items-center justify-center">
        <Text className="">We need your permission to show the camera</Text>
        <CustomButton onPress={requestPermission} className="bg-secondary mt-4">
          <Text>Grant permission</Text>
        </CustomButton>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4 h-full">
      <BackButton />
      <PictureTakingModal
        setUri1={setUri1}
        setUri2={setUri2}
        setBase64Front={setBase64Front}
        setBase64Back={setBase64Back}
        side={side}
        showCamera={showCamera}
        setShowCamera={setShowCamera}
      />
      <View className="flex px-6 h-full">
        <View className="flex-1 mb-10">
          <View className="flex-row justify-center my-4">
            <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
            <View className="w-8 h-8 rounded-full bg-aqua-gem mx-1" />
            <View className="w-8 h-8 rounded-full bg-seabed-green mx-1" />
            <View className="w-8 h-8 rounded-full bg-seperator-line mx-1" />
          </View>
          <Text className="text-lg font-bold text-center my-4">
            Tunnistautuminen
          </Text>
        </View>

        <View className="flex-2 flex justify-center items-center gap-8 bg-card-background rounded-xl p-6 shadow-md">
          <View className="w-full justify-between items-center gap-2">
            <Text className="text-sm self-start text-secondary font-semibold">
              Picture of driverlicense frontside
            </Text>
            <Pressable
              className={`w-full ${side === 'front' ? 'border-4 border-sunshine' : 'border-2 border-dashed border-seabed-green'} transition-all ease-in duration-50 flex justify-center items-center flex-row gap-2`}
              onPress={() => {
                setSide('front');
                setShowCamera(true);
              }}
            >
              {uri1 ? (
                <Image
                  source={{uri: uri1}}
                  className="w-full"
                  style={{
                    aspectRatio: 4 / 3,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <View className="w-full h-20 flex justify-center items-center">
                  <Ionicons name="camera-outline" size={50} color="#093331" />
                  <Text className="text-sm text-seperator-line">
                    Add picture
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
          <View className="w-full justify-between items-center gap-2">
            <Text className="text-sm self-start text-secondary font-semibold">
              Picture of driverlicense backside
            </Text>
            <Pressable
              className={`w-full ${side === 'back' ? 'border-4 border-sunshine' : 'border-2 border-dashed border-seabed-green'} transition-all ease-in duration-50 flex justify-center items-center flex-row gap-2`}
              onPress={() => {
                // Open camera here
                setSide('back');
                setShowCamera(true);
              }}
            >
              {uri2 ? (
                <Image
                  source={{uri: uri2}}
                  className="w-full h-full"
                  style={{
                    aspectRatio: 4 / 3,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <View className="w-full h-20 flex justify-center items-center">
                  <Ionicons name="camera-outline" size={50} color="#093331" />
                  <Text className="text-sm text-seperator-line">
                    Add picture
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
        <View className="flex-1 flex justify-end items-center">
          <CustomButton
            className="bg-secondary mx-auto"
            onPress={handleSubmit(onSubmit)}
          >
            <Text>Seuraava</Text>
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterStep3;
