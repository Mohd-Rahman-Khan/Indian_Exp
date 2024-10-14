import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';

const text1 = `Terms and Conditions FOR THE Indian Express Distribution Network MoBILE APPLICATION OF THE INDIAN EXPRESS PRIVATE LIMITED`;
const text2 = `Dated 15/11/2022`;
const text3 = `This page contains the Terms and Conditions (Agreement) which shall govern your use of The Indian Express Distribution Network Mobile Application (TIEDN APP/ APP/ Application) of The Indian Express (P) Limited (“TIEPL”, “us” or “we”):`;
const text4 = `USER AGREEMENT`;
const text5 = `By using services of TIEDN APP, you agree and provide consent to our collection, use and sharing of your personal information as described in this Agreement and Privacy Policy for TIEDN APP. You (“You” or “User”) can access services of TIEDN APP subject to the terms and conditions of use, as updated or modified from time to timeentirely at the discretion of TIEPL.`;
const text6 = `Your access or use of the TIEDN APP shall mean that you have read, understand and agree to be bound by these terms and conditions. You also represent that you have the legal authority as per applicable law (including but not limited to age requirement) to accept the terms on behalf of yourself and/or any other person you represent in connection with your and/or any other person’s use of the TIEDN APP. If you do not agree to the terms, you are not authorized to use the TIEDN APP. You hereby represent and warrant to us that you are at least eighteen (18) years of age or above and are capable of entering, performing and adhering to these Terms and that you agree to be bound by these terms and conditions.`;
const text7 = `MODIFICATIONS AND CHANGES`;
const text8 = `We reserve the right to add, remove, edit, update, change or modify these Terms & Conditions including but not limited to suspend, cancel, or discontinue TIEDN APP or portions or sections thereof at any time without notice. It shall be your sole responsibility to review these Terms and Conditions prior to each use of TIEDN APP. You shall be deemed to have accepted all such modifications and changes if you continue to access TIEDN APP thereafter.`;
const text9 = `COOKIES`;
const text10 = `We do not use the “cookies” explicitly. However, TIEDN APP may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this APP.`;
const text11 = `LIMITED LICENSE`;
const text12 = `Subject to your compliance with the Terms herein, we hereby grant you a personal, limited, non-exclusive, non-transferable, freely revocable license to use the APP for the personal and non-commercial use only. Except for the foregoing limited license, no right, title or interest shall be transferred to you. Content and services on the TIEDN APP is provided to you “AS IS” for your information and personal use only and may not be used, copied, reproduced, distributed, transmitted, broadcast, displayed, sold, licensed, or otherwise exploited for any other purposes whatsoever without the prior written consent of TIEPL. We reserve all rights not expressly granted in and to the TIEDN APP and the content. These Terms do not authorize you to, and you may not, reproduce, distribute, publicly display, publicly perform, communicate to the public, make available, create derivative works of or otherwise use or exploit any content and TIEDN APP in violation of applicable copyright law. Any unauthorized use of the contents or the APP will result in termination of the limited license granted by us and termination of your account and blockage of your access to the TIEDN APP. Use of TIEDN APP for any unauthorised purpose may result in severe civil and criminal penalties. We do not promote, foster or condone the copying of content, or any other infringing activity and We will have the right to seek damages against you for any such violation.`;
const text13 = `REPRESENTATIONS & WARRANTIES: `;
const text14 = `You warrant, represent and covenant that:`;
const text15 = `You shall not use, upload, post, email, transmit or otherwise make available any content or comment that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, invasive of another’s privacy, hateful, and/or racially, ethnically or otherwise objectionable.`;
const text16 = `You shall not impersonate any person or entity, including, us, official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity.`;
const text17 = `You shall not harm, influence or make inappropriate contact or seek to harm, influence or make inappropriate contact with minors or vulnerable persons in any way.`;
const text18 = `You shall not use, upload, post, email, transmit or otherwise make available any content or comment that infringes and/or passes off or harms or seeks to harm any patent, trademark, service mark, trade secret, brand, copyright or other proprietary rights or personal rights (“Rights”) of any party.`;
const text19 = `You shall not upload, post, email, transmit or otherwise make available any content that you do not have a right to make available under any law or under contractual or fiduciary relationships (such as inside information, proprietary, privileged and confidential information learned or disclosed as part of employment relationships or under nondisclosure agreements).`;
const text20 = `You shall not use, upload, post, email, transmit or otherwise make available any unsolicited or unauthorised advertising, promotional materials, false or fraudulent advertising, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” or any other form of solicitation.`;
const text21 = `You shall not use, upload, post, email, transmit or otherwise make available any content which contains software viruses, or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource.`;
const text22 = `You will not use, upload, post, email, transmit or otherwise make available any content which threatens the unity, integrity, defence, security and/or sovereignty of India or its borders, friendly relations with foreign states, or public order or causes incitement to the commission of any cognisable offence or prevents investigation of any offence or is insulting any other nation; or shows incorrect borders or territory of India.`;
const text23 = `You shall not use, upload, post, email, transmit or otherwise make available any content which is in violation to relevant laws and/or subject to investigation under appropriate laws. Furthermore, if you are found to be non-compliant with the laws and regulations, these terms, or the privacy policy of TIEPL, we may terminate your account/block your access to the TIEDN APP and we reserve the right to remove any non-compliant content uploaded by you.`;
const text24 = `You shall not use, upload, post, email, transmit or otherwise make available any content to cache or archive content from the TIEDN APP or any part thereof.`;
const text25 = `You shall not use, upload, post, email, transmit or otherwise make available any content or device or software designed to or having the effect of circumventing any restriction, condition or technological control to the access of the TIEDN APP including overriding or by passing or compromising any security features, controls or limits.`;
const text26 = `INTELLECTUAL PROPERTY`;
const text27 = `Unless otherwise stated, all Intellectual Property not limited to trademarks, service marks, copyright and all intellectual property rights in all material presented on the TIEDN APP (including but not limited to text, audio, video or graphical images), appearing on the TIEDN APP are our property and such Intellectual Property is protected under applicable law. You agree that you shall have no right title or interest in the Intellectual Property and that you shall not now or in the future claim any right title or interest therein. Any infringement and/or passing off shall be vigorously prosecuted to the maximum extent permitted by law.`;
const text28 = `YOUR PRIVACY`;
const text29 = `For information about TIEPL policies and practices regarding the collection and use of your personally identifiable information, please read the Privacy Policy of TIEPL APP. The Privacy Policy is incorporated by reference and made part of these Terms. Thus, by agreeing to these Terms, you agree that your presence on the TIEPL Appand use of the services are governed by TIEPL’s Privacy Policy in effect at the time of your use.`;
const text30 = `DISCLAIMER`;
const text31 = `The information from or through TIEDN APP is provided on an “AS IS” and “as available” basis, and we do not warrant that TIEDN APP will operate error-free or that the TIEDN APP and its servers are free of computer viruses or other harmful mechanisms. `;
const text32 = `We shall not be liable, at any time for damages (including, without limitation, damages for loss of business projects, loss of savings, loss of revenue, loss or loss of profits) arising in contract, tort or otherwise from the use of or inability to use TIEDN APP, or any of its contents, or from any act or omissions as a result of using the TIEDN APP or any such contents or for any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communications line failure, theft or destruction or unauthorised access to, alteration of, or use of information contained on the TIEDN APP. No representations, warranties or guarantees whatsoever are made as to the accuracy, adequacy, reliability, completeness, suitability or applicability of the information to a particular situation. We, our affiliates, directors, shareholders, employees, representatives, advertisers and content providers, shall not be liable to you or anyone else as a result of your access to the TIEDN APP for indirect, special, incidental, punitive or exemplary damages. `;
const text33 = `GENERAL TERMS`;
const text34 = `Assignment: You may not transfer to anyone else, either temporarily or permanently, any rights to use the TIEDN APP or any part of the TIEDN APP. Any attempt by you to do so is void. TIEPL may assign, transfer, delegate and/or grant all or any part of its rights, privileges and properties hereunder to any person or entity.`;
const text35 = `Geographic Limitation: TIEDN APP are controlled and offered by TIEPL from its facilities in the territory of India. TIEPL makes no representations that TIEDN APP or services are appropriate or available for use in other locations. If you are accessing or using TIEDN APP from other jurisdictions, you do so at your own risk and you are responsible for compliance with local law. `;
const text36 = `Collection and use of personal information: For information about TIEPL policies and practices regarding the collection and use of your personally identifiable information, please read the Privacy Policy of TIEPL APP. The Privacy Policy is incorporated by reference and made part of these Terms and Conditions. Thus, by agreeing to these Terms and Conditions, you agree that your presence on the TIEPL App and use of the services are governed by TIEPL’s Privacy Policy in effect at the time of your use.`;
const text37 = `Access to use: To access the TIEDN APP, you will be asked to enter your individual username and password, as chosen by you during your registration. Therefore, TIEPL does not permit any of the following: `;
const text38 = `Any other person sharing your account and Password;`;
const text39 = `Any part of the TIEDN APP being cached in proxy servers and accessed by individuals who have not registered as users of the TIEDN APP; or`;
const text40 = `Access through a single account and Password being made available to multiple users on a network.`;
const text41 = `If TIEPL reasonably believes that an account and password is being used / misused in any manner, TIEPL shall reserve the right to cancel access rights immediately without notice, and block access to all users from that IP address. TIEPL reserves the right to reject any username selected by you and/or revoke your right to any previously selected user name and give such user name to any other person or entity at our sole discretion and without any liability to you. Furthermore, you shall be entirely responsible for any and all activities that occur under your account. You agree to notify TIEPL immediately of any unauthorized use of your account or any other breach of security. TIEPL will not be liable for any loss that you may incur as a result of someone else using your password or account, however, you could be held liable for losses incurred by TIEPL or another party due to someone else using your account or password. If messages sent to an email address/ mobile numberprovided by you and associated with your account are returned as undeliverable or wrong address; TIEPL reserves the right to terminate your account immediately with or without notice to you and without any liability to you or any third party.`;
const text42 = `Availability: You are responsible for all Internet access charges. Please check with your Internet provider for information on possible Internet data usage charges.`;
const text43 = `Non-Waiver: Any express waiver or failure to exercise promptly any right under this agreement will not create a continuing waiver or any expectation of non-enforcement.`;
const text44 = `Entire agreement: These Terms and Conditions constitute the entire agreement between the parties with respect to the subject matter hereof and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter.`;
const text45 = `DISCLAIMER OF WARRANTIES AND LIABILITY`;
const text46 = `You understand and agree that TIEPL provides the services on ´as-is´ ´with all faults´ and ´as available´ basis. You agree that use of TIEDN APP is at your risk. All warranties including without limitation, the implied warranties of merchantability, fitness for a particular purpose, for the title and non-infringement are disclaimed and excluded.`;
const text47 = `No representations, warranties or guarantees whatsoever are made by TIEPL as to the (a) accuracy, adequacy, reliability, completeness, suitability or applicability of the information to a particular situation; (b) that the service will be uninterrupted, timely, secure, or error-free; (c) the quality of any services, content, information, or other material on TIEDN APP will meet your expectations or requirements; (d) any errors in the TIEDN APP will be corrected; (e) warranties against infringement of any third party intellectual property or proprietary rights; or (f) other warranties relating to performance, non-performance, or other acts or omissions of TIEPL, its officers, directors, employees, affiliates, agents, licensors, or suppliers.`;
const text48 = `TIEPL does not warrant that any of the software used and or licensed in connection with TIEDN APP will be compatible with other Third-Party software or devices nor does it warrant that operation of the APP and the associated software will not damage or disrupt other software or hardware.`;
const text49 = `Any transactions relating to sale/purchase of goods or services not directly offered by TIEPL are to be settled inter-se between the parties to such transaction and all warranties express or implied of any kind, regarding any matter pertaining thereto, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and non-infringement are disclaimed by TIEPL.It is only you, who is entirely responsible for all the activities, arising out of the transactions of sale/purchase of goods or services offered by any other party and not TIEPL. TIEPL will not be liable for any loss that you may incur, while selling or purchasing goods /services of the third party.`;
const text50 = `TIEPL, its affiliates, successors, and assigns, and each of their respective investors, directors, officers, employees, agents, and suppliers shall not be liable, at any time for any, direct, indirect, punitive, incidental, special, consequential, damages arising out of or in any way connected with the use of APP, whether based in contract, tort, strict liability, or other theory, even if TIEPL have been advised of the possibility of damages.`;
const text51 = `In the event any exclusion contained herein be held to be invalid for any reason and TIEPL or any of its affiliate entities, officers, directors or employees become liable for loss or damage, then, any such liability of TIEPL or any of its affiliate entities, officers, directors or employees shall be limited to the payment madeby you towards the supply of NewsPaper / Magazine in the month preceding the date of your claim.`;
const text52 = `GOVERNING LAW AND JURISDICTION`;
const text53 = `This agreement shall be governed by the Indian Laws. The courts at New Delhi shall have exclusive jurisdiction over any disputes arising out or relating to this agreement.`;
const text54 = `REFUND POLICY`;
const text55 = `The payment(s) made by you on TIEDN APP towards the outstanding/ collection for the supply of NewsPaper / Magazine is non-refundable. You do not have any right to claim for refund your payments in whole or any part. Although you may notify us of your reason for requesting for refund at any time by notifying our team at tiednmumbai@expressindia.com , however you will not receive a refund (except in the limited circumstances as we deem fit). We use third party payment gateway services for receiving payment from you and you agree to make payment using these third-party payment gateway.`;
const text56 = `TERMINATION OF USER AGREEMENT`;
const text57 = `We can terminate your account or suspend or discontinue your access to the TIEDN APPdue to your violation of these Terms. We may retain any information and associated records that are required to be retained or preserved under applicable laws including post termination of your account and irrespective of whether such information or content has been removed or access to it has been disabled. `;

const TermsOfService = ({navigation, route}) => {
  return (
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
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'black',
              paddingVertical: 10,
            }}>
            {text1}
          </Text>
          <Text style={styles.textStyle}>{text2}</Text>
          <Text style={[styles.textStyle, {paddingTop: 20, paddingBottom: 30}]}>
            {text3}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text4}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text5}</Text>
          <Text style={[styles.textStyle, {paddingTop: 20, paddingBottom: 30}]}>
            {text6}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text7}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text8}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text9}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text10}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text11}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text12}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text13}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text14}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text15}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text16}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text17}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text18}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text19}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text20}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text21}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text22}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text23}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text24}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text25}</Text>
          <Text style={[styles.textStyle2, {paddingTop: 30}]}>{text26}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text27}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text28}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text29}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text30}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text31}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10, paddingBottom: 30}]}>
            {text32}
          </Text>
          <Text style={[styles.textStyle2, {}]}>{text33}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text34}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text35}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text36}</Text>
          <Text style={[styles.textStyle, {paddingTop: 20}]}>{text37}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text38}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text39}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text40}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text41}</Text>
          <Text style={[styles.textStyle, {paddingTop: 20}]}>{text42}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text43}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text44}</Text>
          <Text style={[styles.textStyle2, {paddingTop: 30}]}>{text45}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text46}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text47}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text48}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text49}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text50}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text51}</Text>
          <Text style={[styles.textStyle2, {paddingTop: 30}]}>{text52}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text53}</Text>
          <Text style={[styles.textStyle2, {paddingTop: 30}]}>{text54}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text55}</Text>
          <Text style={[styles.textStyle2, {paddingTop: 30}]}>{text56}</Text>
          <Text style={[styles.textStyle, {paddingTop: 10}]}>{text57}</Text>
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
  );
};

export default TermsOfService;
