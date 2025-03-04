// import { ComponentResponse, ComponentType } from '../models/event.model';

// export const eventData: ComponentResponse = {
//   resultCode: 'SUCCESS',
//   resultMessage: '성공',
//   eventId: 'event-123',
//   components: [
//     {
//       type: ComponentType.TITLE,
//       text: '잡코리아x알바몬이 쏜다! 캠퍼스 어택',
//       fontSize: 16,
//       fontWeight: '700',
//       color: '#000000',
//     },
//     {
//       type: ComponentType.FLOATING_BUTTON,
//       text: '이벤트 참여하기',
//       backgroundColor: '#ff7e1d',
//       textColor: '#ffffff',
//       width: '80%',
//       height: '47',
//       fontSize: 16,
//       fontWeight: '700',
//       bottom: 20,
//       onClick: 'handleFloatingButtonClick',
//     },
//     {
//       type: ComponentType.IMAGE,
//       width: '100%',
//       backgroundColor: '#ff7e1d',
//       imageUrl: 'https://img.albamon.kr/banner//2024/10/esrgoo28135334.png?v=1732498088001',
//     },
//     {
//       type: ComponentType.IMAGE_WITH_BUTTON,
//       backgroundColor: '#ff7e1d',
//       paddingTop: 24,
//       paddingLeft: 24,
//       paddingRight: 24,
//       children: [
//         {
//           type: ComponentType.IMAGE,
//           backgroundColor: '#fff',
//           width: '100%',
//           paddingTop: 30,
//           paddingBottom: 30,
//           paddingLeft: 24,
//           paddingRight: 24,
//           imageUrl: 'https://mts17-mc.albamon.kr/monimg/msa/assets/images/events/campusBattle/share_top.png',
//         },
//         {
//           type: ComponentType.BUTTON,
//           onClick: 'handleKakaoShareClick',
//           width: '100%',
//           height: '46',
//           text: '카카오톡으로 공유하기',
//           color: '#ffffff',
//           buttonColor: '#000000',
//           backgroundColor: '#fff',
//           fontSize: 16,
//           fontWeight: '700',
//           borderRadius: '8px',
//           paddingLeft: 24,
//           paddingRight: 24,
//           paddingBottom: 30,
//         },
//       ],
//     },
//     {
//       type: ComponentType.SPLIT,
//       backgroundColor: '#ff7e1d',
//       paddingLeft: 24,
//       paddingRight: 24,
//     },
//     {
//       type: ComponentType.CAROUSEL,
//       backgroundColor: '#ff7e1d',
//       paddingTop: 24,
//       paddingBottom: 24,
//       paddingLeft: 24,
//       paddingRight: 24,
//       children: [
//         {
//           type: ComponentType.IMAGE,
//           width: '214',
//           height: '382',
//           imageUrl: 'https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2316jpg.jpg?v=1732498088001',
//         },
//         {
//           type: ComponentType.IMAGE,
//           width: '214',
//           height: '382',
//           imageUrl: 'https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2320jpg.jpg?v=1732498088001',
//         },
//         {
//           type: ComponentType.IMAGE,
//           width: '214',
//           height: '382',
//           imageUrl: 'https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2317jpg.jpg?v=1732498088001',
//         },
//       ],
//     },
//     {
//       type: ComponentType.FOOTER,
//       text: '꼭 읽어주세요!',
//       backgroundColor: '#000',
//       fontSize: 16,
//       fontWeight: '400',
//       textAlign: 'left',
//       color: '#fff',
//       paddingTop: 20,
//       paddingBottom: 20,
//       paddingLeft: 16,
//       paddingRight: 16,
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px',
//       children: [
//         {
//           type: ComponentType.LIST,
//           text: '본 이벤트는 잡코리아 알바몬이 함께합니다.',
//           fontSize: 12,
//           color: '#f9f9f9',
//         },
//         {
//           type: ComponentType.LIST,
//           text: '당첨자 이벤트 경품은 응모 시 입력한 휴대폰 번호로 발송됩니다.',
//           fontSize: 12,
//           color: '#f9f9f9',
//         },
//       ],
//     },
//   ],
// };
