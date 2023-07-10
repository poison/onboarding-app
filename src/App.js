import React, { useState } from 'react';
import { TextInput } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Next from 'react-native-vector-icons/Feather';
import Check from 'react-native-vector-icons/Feather';
import Circle from 'react-native-vector-icons/FontAwesome';
import NavIcon from 'react-native-vector-icons/EvilIcons';
import { CountryPicker } from 'react-native-country-codes-picker';
import Flag from './assets/images/flag.png';
import { Image } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Slider } from 'react-native-elements';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+1');
  const [countryFlag, setCountryFlag] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [headerTitle, setHeaderTitle] = useState('Basic Info');
  const [headerTravel, setheaderTravel] = useState('Travel');
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  // Array of available gender tags
  const genderTags = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Non-binary' },
    { id: 4, name: 'Agender' },
    { id: 5, name: 'Cisgender' },
    { id: 6, name: 'Demigender' },
    { id: 7, name: 'Genderquerr' },
    { id: 8, name: 'Gender Fluid' },
    { id: 9, name: 'Gender Neutral' },
    { id: 10, name: 'Gender Noconforming' },
    { id: 11, name: 'Gender Questioning' },
    { id: 12, name: 'Intergender' },
    { id: 13, name: 'Multi-Gender' },
    { id: 14, name: 'Pangender' },
    { id: 15, name: 'Pronouns' },
    { id: 16, name: 'Transgender' },
    { id: 17, name: 'Self-identify' },

    // Add more gender tags here...
  ];

  // Toggle the tag selection
  const toggleTagSelection = tagId => {
    const isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  // Show all tags
  const handleSeeMore = () => {
    setShowAllTags(true);
  };

  // Check if a tag is selected
  const isTagSelected = tagId => {
    return selectedTags.includes(tagId);
  };

  // Render a single tag
  const renderTag = tag => {
    const isSelected = isTagSelected(tag.id);
    const tagBackgroundColor = isSelected ? '#dbff00' : '#ecedee';
    const tagTextColor = isSelected ? '#000' : '#000';
    const checkMarkIcon = isSelected ? (
      <Check name="check" size={24} color="#000" />
    ) : null;

    return (
      <TouchableOpacity
        key={tag.id}
        style={[styles.tag, { backgroundColor: tagBackgroundColor }]}
        onPress={() => toggleTagSelection(tag.id)}
      >
        {checkMarkIcon}
        <Text style={[styles.tagText, { color: tagTextColor }]}>
          {tag.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // Render the gender tags
  const renderTags = () => {
    const visibleTags = showAllTags ? genderTags : genderTags.slice(0, 3);
    return visibleTags.map(tag =>
      // <View style={{ backgroundColor: 'blue' }}>{renderTag(tag)}</View>
      renderTag(tag),
    );
  };

  const handleBack = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSkip = () => {
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handleFirstNameChange = text => {
    setFirstName(text);
  };

  const handlePhoneNumber = text => {
    setPhoneNumber(text);
  };

  const handleLastNameChange = text => {
    setLastName(text);
  };

  const convertToTime = value => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h${minutes}m`;
  };

  // Function to determine the text color based on slider value
  const getTextColor = value => {
    return value > 0 ? '#000000' : '#dcdddf';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          paddingVertical: 20,
        }}
      >
        {currentStep > 0 ? (
          <TouchableOpacity onPress={handleBack}>
            <Icon name="chevron-back-outline" size={20} color="#000" />
          </TouchableOpacity>
        ) : (
          <Icon name="chevron-back-outline" size={20} color="#fff" />
        )}
        <Text style={styles.mainHeading}>
          {currentStep == 4 ? headerTravel : headerTitle}
        </Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text
            style={{
              fontSize: 18,
              color: '#7830ee',
              fontFamily: 'Inter-ExtraBold',
            }}
          >
            SKIP
          </Text>
        </TouchableOpacity>
      </View>

      {/* Multi-step tiles */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
          paddingLeft: 14,
          paddingRight: 14,
        }}
      >
        {[...Array(10)].map((_, index) => (
          <View
            key={index}
            style={{
              width: 25,
              height: 5,
              borderRadius: 10,
              marginBottom: 20,
              backgroundColor:
                index === currentStep
                  ? '#dbff00'
                  : index < currentStep
                  ? '#7830ee'
                  : '#dcdddf',
            }}
          />
        ))}
      </View>

      {/* Screen 1 */}
      {currentStep == 0 && (
        <View style={styles.content}>
          <Text style={styles.heading}>
            Let's get started, what's your first name?
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#dcdddf"
            placeholder="First Name"
            value={firstName}
            onChangeText={handleFirstNameChange}
          />
        </View>
      )}

      {/* Screen 2 */}
      {currentStep == 1 && (
        <View style={styles.content}>
          <Text style={styles.heading}>
            OK, {firstName}! How about your last name?
          </Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#dcdddf"
            placeholder="Last Name"
            value={lastName}
            onChangeText={handleLastNameChange}
          />
        </View>
      )}

      {/* Screen 3 */}
      {currentStep == 2 && (
        <View style={styles.content}>
          <Text style={styles.heading}>What's your mobile number?</Text>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                width: 120,
                borderWidth: 1,
                borderColor: '#dcdddf',
                padding: 10,
                borderRadius: 1,
                height: 50,
              }}
            >
              {countryFlag == '' ? (
                <Image
                  source={require('./assets/images/flag.png')}
                  style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    left: 20,
                    top: 12,
                  }}
                />
              ) : (
                ''
              )}
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                {countryFlag} {countryCode}
              </Text>
            </TouchableOpacity>

            {/* Phone Number Input */}
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={handlePhoneNumber}
              keyboardType="phone-pad"
              placeholderTextColor="#dcdddf"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#7f8082', fontFamily: 'Inter-Regular' }}>
              We will send you a text with a verification code.
            </Text>
            <Text style={{ color: '#7f8082' }}>
              Standard message and data rates may apply
            </Text>
          </View>

          <CountryPicker
            show={show}
            style={{
              modal: {
                height: '100%',
              },
              searchMessageText: {
                color: '#000',
              },
              textInput: {
                color: '#000',
              },
              countryName: {
                color: '#000',
              },
              dialCode: {
                color: '#000',
              },
              countryMessageContainer: {
                color: '#000',
              },
            }}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={item => {
              console.log(item);
              setCountryCode(item.dial_code);
              setCountryFlag(item.flag);
              setShow(false);
            }}
          />
        </View>
      )}

      {/* Screen 4 */}
      {currentStep == 3 && (
        <View style={styles.content}>
          <Text style={styles.heading}>Enter your verification code</Text>
          <View>
            <OTPInputView
              pinCount={6}
              autoFocusOnLoad={false}
              style={{ height: 50 }}
              codeInputFieldStyle={styles.boxStyle}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
          <View>
            <Text
              style={{
                color: '#7f8082',
                marginTop: 10,
                fontFamily: 'Inter-Regular',
              }}
            >
              We texted you one-time verification code to
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Text style={{ color: '#7f8082' }}>
                {countryCode}
                {phoneNumber}
              </Text>
              <TouchableOpacity onPress={handleBack}>
                <Text
                  style={{
                    color: '#7f8082',
                    fontWeight: 'bold',
                    marginLeft: 5,
                    borderBottomWidth: 1,
                  }}
                >
                  Change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Screen 5 */}
      {currentStep == 4 && (
        <View style={styles.content}>
          <Text style={styles.heading}>
            Rank your preferred modes of transport
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#bebfc1',
                marginRight: 20,
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}
            >
              1
            </Text>
            <TouchableOpacity style={styles.transportWrap} onPress={handleSkip}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#e9e6f7',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                    width: 40,
                    height: 40,
                  }}
                >
                  <Image
                    source={require('./assets/images/car.png')}
                    style={{ width: 20, resizeMode: 'contain', height: 20 }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Inter-Regular',
                  }}
                >
                  Car
                </Text>
              </View>
              <View>
                <NavIcon name="navicon" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#bebfc1',
                marginRight: 20,
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}
            >
              2
            </Text>
            <TouchableOpacity style={styles.transportWrap} onPress={handleSkip}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#e9e6f7',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                    width: 40,
                    height: 40,
                  }}
                >
                  <Image
                    source={require('./assets/images/train.png')}
                    style={{ width: 20, resizeMode: 'contain', height: 20 }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Inter-Regular',
                  }}
                >
                  Public transport
                </Text>
              </View>
              <View>
                <NavIcon name="navicon" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#bebfc1',
                marginRight: 20,
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}
            >
              3
            </Text>
            <TouchableOpacity style={styles.transportWrap} onPress={handleSkip}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#e9e6f7',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                    width: 40,
                    height: 40,
                  }}
                >
                  <Image
                    source={require('./assets/images/cycle.png')}
                    style={{ width: 20, resizeMode: 'contain', height: 20 }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Inter-Regular',
                  }}
                >
                  Bike
                </Text>
              </View>
              <View>
                <NavIcon name="navicon" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: '#bebfc1',
                marginRight: 20,
                fontSize: 20,
                fontFamily: 'Inter-Regular',
              }}
            >
              4
            </Text>
            <TouchableOpacity style={styles.transportWrap} onPress={handleSkip}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#e9e6f7',
                    padding: 10,
                    borderRadius: 10,
                    marginRight: 10,
                    width: 40,
                    height: 40,
                  }}
                >
                  <Image
                    source={require('./assets/images/walk.png')}
                    style={{ width: 20, resizeMode: 'contain', height: 20 }}
                  />
                </View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontFamily: 'Inter-Regular',
                  }}
                >
                  Walk
                </Text>
              </View>
              <View>
                <NavIcon name="navicon" size={20} color="#000" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Screen 6 */}
      {currentStep == 5 && (
        <View style={styles.content}>
          <Text style={styles.heading}>
            What would your ideal maximum commute time be?
          </Text>
          <View>
            <Text
              style={{
                color: getTextColor(sliderValue),
                textAlign: 'center',
                marginBottom: 15,
                fontSize: 30,
                fontWeight: 'bold',
              }}
            >
              {convertToTime(sliderValue)}
            </Text>
            <Slider
              value={sliderValue}
              onValueChange={value => setSliderValue(value)}
              minimumValue={0}
              maximumValue={120}
              step={1}
              minimumTrackTintColor="#7830ee"
              maximumTrackTintColor="#ecedee"
              thumbStyle={{
                height: 35,
                width: 35,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              thumbProps={{
                children: (
                  <Circle
                    name="circle"
                    type="font-awesome"
                    size={25}
                    containerStyle={{ bottom: 20, right: 20 }}
                    color="#7830ee"
                    style={{ position: 'absolute', top: 5, left: 6 }}
                  />
                ),
              }}
              thumbTouchSize={{ width: 40, height: 40 }}
              trackStyle={{ height: 10, borderRadius: 20 }}
            />
          </View>
        </View>
      )}

      {/* Screen 7 */}
      {currentStep == 6 && (
        <View style={styles.content}>
          <Text style={styles.heading}>What gender best describes you?</Text>

          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {renderTags()}
            </View>
            {!showAllTags && (
              <TouchableOpacity
                style={styles.seeMoreButton}
                onPress={handleSeeMore}
              >
                <Text style={styles.seeMoreButtonText}>More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleSkip}>
        <Next name="corner-down-right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  heading: {
    fontSize: 35,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'Sora-Regular',
    // fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dcdddf',
    padding: 10,
    color: '#000',
    borderRadius: 5,
    // placeholderTextColor: 'red', // Specify the placeholder text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainHeading: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter-ExtraBold',
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#7830ee',
    borderRadius: 30,
    padding: 10,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dcdddf',
    padding: 10,
    marginLeft: 10,
    color: '#000',
    fontSize: 18,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flags: {
    width: 66,
    height: 58,
    resizeMode: 'contain',
    backgroundColor: 'red',
    borderWidth: 1,
    display: 'none',
  },
  boxStyle: {
    borderColor: '#bebfc1',
    borderRadius: 8,
    color: '#000',
  },
  underlineStyleHighLighted: {
    borderColor: '#7830ee',
  },
  transportWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '85%',
    borderRadius: 10,
    padding: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  tagText: {
    marginLeft: 5,
    fontSize: 18,
  },
  seeMoreButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  seeMoreButtonText: {
    color: '#7830ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default App;
