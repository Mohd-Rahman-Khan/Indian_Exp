import React from 'react';
import {
    View,
    Text,
    ScrollView
  } from 'react-native';
import styles from './styles';

const text1 = `PRIVACY POLICY FOR THE Indian Express Distribution Network MOBILE Application (TIEDN APP/ APP/ APPLICATION) OF THE INDIAN EXPRESS (P) Ltd.`;
const text2 = `This Privacy Policy shall govern your use of The Indian Express Distribution Network Mobile Application (TIEDN APP/APP/ Application)of The Indian Express (P) Limited (“TIEPL”, “us” or “we”): This policy describes the information that we collect from you when you download, access or use TIEDN Application, via any mobile or internet connected device or otherwise.`;
const text3 = `1. User consent`;
const text4 = `By using services of TIEDN Application, you agree and provide consent to our collection, use and sharing of your personal information as described in this policy. You are urged to update to the most current version of TIEDN Application. If you use an older version of this App, we may not be responsible or liable for any damages, due to any collection, storage and processing of your personal information as per the older version of the Application.`;
const text5 = `2. Personal Information Collected`;
const text6 = `We collect personal information from you only if you provide it voluntarily. The type of personally identifiable information that may be collected by us includes and is not limited to, name, address, e-mail address, mobile number, employee ID, geo-location, payment related information and financial transactions etc.`;
const text7 = `3. Collection of Information by Third-Party Sites`;
const text8 = `TIEDN application may sometime contain links to other websites/ applications whose privacy policies may be different to ours. You should consult the other sites/applications’ privacy policies as we have no control over privacy policies of these third parties and information that is submitted to, or collected by, these third parties. It is advisable to read their privacy policies for further information.`;
const text9 = `4. Log File Information and Cookies`;
const text10 = `We may also collect log information from your device, including your location, IP address, your device’s name, device’s serial number or unique identification number (e.g. UDiD on your iOS device), your device operating system, browser type and version, and connection speed, the time and date of your use of the App and other statistics etc. This APP does not use the “cookies” explicitly. However, the APP may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this APP.`;
const text11 = `5. Data Erasure`;
const text12 = `We retain your personal information as long as necessary for us to provide services to you or you ask us to not retain your data. If you no longer want us to use your information then you can request that we erase your personal information and close your services account as soon as reasonably possible, based on your account activity and in accordance with applicable law(s) of India. You can request for deletion of your information by writing to our designated Grievance Officer, through email with subject “w.r.t. The Indian Express Distribution Network Application” and signed with the electronic signature, to grievanceofficer@indianexpress.com.`;
const text13 = `6. Information from other Sources`;
const text14 = `We may receive information about you from other sources, add it to our account information and treat it in accordance with this Policy. If you provide information to the platform provider or other partner, whom we provide services to, your account information and order information may be passed on to us.`;
const text15 = `7. Information use by the company`;
const text16 = `We may use the information supplied by you to provide you TIEDN App services, to administer our services, to facilitate your use of functionalities of App, to communicate with you concerning the App and to assist you with operational requests such as password reset requests, notify you about changes in terms of service or privacy policy etc. We may also use the above said user Information to maintain, protect, and improve the APP and provide you the most user-friendly experience. Any personally identifiable information provided by you will not be considered as sensitive if it is freely available and / or accessible in the public domain like any comments, messages, blogs, scribbles available on social platforms like Facebook, Twitter, etc. In case you choose to decline to submit personal information on the TIEDN application, we may not be able to provide certain services on the TIEDN application to you. In any case, we will not be liable and or responsible for the denial of certain services to you for lack of you providing the necessary personal information.`;
const text17 = `8. Information Sharing`;
const text19 = `We may share your Information with any third party without obtaining your prior consent in the following limited circumstances:`
const text20 = `a. When it is requested or required by law or by any court or governmental agency or authority to disclose, for the purpose of verification of identity, or for the prevention, detection, investigation including but not limited to cyber incidents, or for prosecution and punishment of offences. These disclosures are made in good faith and belief that such disclosure is reasonably necessary for enforcing these terms or for complying with the applicable laws and regulations.`;
const text21 = `b. We may share your Information within our group companies and officers and employees of such group companies for the purpose of processing personal information on its behalf. We also ensure that these recipients of such Information agree to process such information based on our instructions and in compliance with this Policy and any other appropriate confidentiality and security measures.`;
const text22 = `c. We may share your Information to enforce or protect our rights or any or all of its affiliates, associates, employees, directors or officers or when we have reason to believe that disclosing Information of User(s) is necessary to identify, contact or bring legal action against someone who may be causing interference with our rights or our Application, whether intentionally or otherwise, or when anyone else could be harmed by such activities.`;
const text23 = `9. Accessing and updating personal information`;
const text24 = `When you use the TIEDN application, we make good faith efforts to provide you, as and when requested by you, with access to your personal information and shall further ensure that any personal information or sensitive personal data or information found to be inaccurate or deficient shall be corrected or amended as feasible, subject to any requirement for such personal information or sensitive personal data or information to be retained by law or for legitimate business purposes. We ask individual users to identify themselves and the information requested to be accessed, corrected or removed before processing such requests, and we may decline to process requests that are unreasonably repetitive or systematic, require disproportionate technical effort, jeopardize the privacy of others, or would be extremely impractical (for instance, requests concerning information residing on backup tapes), or for which access is not otherwise required. In any case, where we provide information access and correction, we perform this service free of charge, except if doing so would require a disproportionate effort. Because of the way we maintain certain services and/or due to requirements under applicable Indian laws for retaining or preserving information, after you delete your information, such information and/or residual copies may take a period of time before they are deleted from our active servers and may remain in our backup systems.`;
const text25 = `10. Information security`;
const text26 = `We take appropriate security measures to protect against unauthorized access to or unauthorized alteration, disclosure or destruction of data. These include internal reviews of our data collection, storage and processing practices and security measures, including appropriate encryption and physical security measures to guard against unauthorized access to systems where we store personal data. All information gathered on the TIEDN application is securely stored within our controlled database. The database is stored on servers secured behind a firewall; access to the servers is password-protected and is strictly limited. However, as effective as our security measures are, no security system is impenetrable. We cannot guarantee the security of our database, nor can we guarantee that information you supply will not be intercepted while being transmitted to us over the Internet.. .`;
const text27 = `11. Updates/ changes`;
const text28 = `The internet is an ever-evolving medium. We may alter our Policy from time to time to incorporate necessary changes in technology, applicable Indian law or any other variant. In any case, we reserve the right to change (at any point of time) the terms of this Policy. Any changes we make will be effective immediately on notice, which we may give by posting the new policy on the TIEDN application. Your use of the TIEDN application after such notice will be deemed acceptance of such changes. In any case, you are advised to review this Policy periodically on the application to ensure that you are aware of the latest version.`;
const text29 = `12. Questions/ Grievances Redressals`;
const text30 = `Redressal Mechanism: Any complaints, abuse or concerns with regards to the processing of information provided by you or breach of these terms shall be immediately informed to the designated Grievance Officer through email with subject “w.r.t. The Indian Express Distribution Network Application” and signed with the electronic signature, to grievanceofficer@indianexpress.com.`

const PrivacyPolicy = ({navigation, route}) => {
    return(
     <View style={styles.container}>
       <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          borderRadius: 20,
          paddingHorizontal: '5%',
          paddingVertical: '2%',
        }}>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 14,
            color: 'blue',
            fontWeight: '400',
            alignSelf: 'flex-end',
            textDecorationLine: 'underline',
          }}>
          Close
        </Text>
        <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >
       <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: 'black',
            paddingVertical: 10,
          }}>{text1}</Text>
        <Text style={styles.textStyle}>{text2}</Text>
        <Text style={styles.textStyle}>{text3}</Text>
        <Text style={styles.textStyle}>{text4}</Text>
        <Text style={styles.textStyle}>{text5}</Text>
        <Text style={styles.textStyle}>{text6}</Text>
        <Text style={styles.textStyle}>{text7}</Text>
        <Text style={styles.textStyle}>{text8}</Text>
        <Text style={styles.textStyle}>{text9}</Text>
        <Text style={styles.textStyle}>{text10}</Text>
        <Text style={styles.textStyle}>{text11}</Text>
        <Text style={styles.textStyle}>{text12}</Text>
        <Text style={styles.textStyle}>{text13}</Text>
        <Text style={styles.textStyle}>{text14}</Text>
        <Text style={styles.textStyle}>{text15}</Text>
        <Text style={styles.textStyle}>{text16}</Text>
        <Text style={styles.textStyle}>{text17}</Text>
        <Text style={styles.textStyle}>{text19}</Text>
        <Text style={styles.textStyle}>{text20}</Text>
        <Text style={styles.textStyle}>{text21}</Text>
        <Text style={styles.textStyle}>{text22}</Text>
        <Text style={styles.textStyle}>{text23}</Text>
        <Text style={styles.textStyle}>{text24}</Text>
        <Text style={styles.textStyle}>{text25}</Text>
        <Text style={styles.textStyle}>{text26}</Text>
        <Text style={styles.textStyle}>{text27}</Text>
        <Text style={styles.textStyle}>{text28}</Text>
        <Text style={styles.textStyle}>{text29}</Text>
        <Text style={styles.textStyle}>{text30}</Text>
        <Text
          onPress={() => navigation.goBack()}
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: 'blue',
            textDecorationLine: 'underline',
            paddingBottom: '10%',
            paddingTop: 30,
            alignSelf: 'center',
          }}>
          To Login Page
        </Text>
        </ScrollView>
      </View>
    </View>
    )
};

export default PrivacyPolicy;
