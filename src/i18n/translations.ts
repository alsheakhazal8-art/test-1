import { LanguageCode } from '../types/index.js';

export interface TranslationDictionary {
  common: {
    appName: string;
    tagline: string;
    loading: string;
    save: string;
    cancel: string;
    confirm: string;
    delete: string;
    edit: string;
    close: string;
    submit: string;
    search: string;
    filter: string;
    all: string;
    back: string;
    viewAll: string;
    learnMore: string;
    optional: string;
    required: string;
    yes: string;
    no: string;
    status: string;
    actions: string;
    timeAgo: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  nav: {
    home: string;
    explore: string;
    lostItems: string;
    foundItems: string;
    createReport: string;
    messages: string;
    notifications: string;
    saved: string;
    profile: string;
    settings: string;
    admin: string;
    login: string;
    register: string;
    logout: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    forgotPassword: string;
    rememberMe: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    termsAgreement: string;
    termsLink: string;
    privacyLink: string;
    resetPasswordTitle: string;
    resetPasswordSubtitle: string;
    sendResetLink: string;
    enterToken: string;
    newPassword: string;
    resetSuccess: string;
    passwordMinLength: string;
    passwordsDoNotMatch: string;
    loginSuccess: string;
    registerSuccess: string;
  };
  feed: {
    allReports: string;
    lostFeed: string;
    foundFeed: string;
    resolvedFeed: string;
    searchPlaceholder: string;
    cityFilter: string;
    allCategories: string;
    sortNewest: string;
    sortOldest: string;
    sortMostViewed: string;
    reportCount: string;
    emptyTitle: string;
    emptySubtitle: string;
    emptyAction: string;
    noResultsTitle: string;
    noResultsSubtitle: string;
    clearFilters: string;
    welcomeHeading: string;
    welcomeSubtitle: string;
    reuniteCount: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  categories: {
    phones_electronics: string;
    wallets_money: string;
    keys: string;
    bags_luggage: string;
    documents_id: string;
    jewelry_accessories: string;
    clothing: string;
    pets: string;
    books_school: string;
    vehicles_bikes: string;
    other: string;
  };
  reportForm: {
    titleLost: string;
    titleFound: string;
    typePrompt: string;
    itemLost: string;
    itemFound: string;
    itemTitle: string;
    itemTitlePlaceholder: string;
    category: string;
    selectCategory: string;
    description: string;
    descriptionPlaceholder: string;
    city: string;
    cityPlaceholder: string;
    location: string;
    locationPlaceholder: string;
    date: string;
    uploadPhoto: string;
    uploadPhotoHint: string;
    secretDetail: string;
    secretDetailHint: string;
    secretDetailWarning: string;
    contactPreference: string;
    contactInApp: string;
    contactEmail: string;
    preferredLanguage: string;
    submitReport: string;
    updateReport: string;
    safetyNotice: string;
  };
  reportDetail: {
    lostOn: string;
    foundOn: string;
    locationAt: string;
    reportedBy: string;
    memberSince: string;
    statusOpen: string;
    statusMatched: string;
    statusResolved: string;
    statusClosed: string;
    views: string;
    share: string;
    bookmark: string;
    like: string;
    reportItem: string;
    contactFinder: string;
    contactOwner: string;
    claimItem: string;
    secretDetailTitle: string;
    secretDetailDesc: string;
    commentsTitle: string;
    noComments: string;
    addCommentPlaceholder: string;
    postComment: string;
    deleteReportConfirm: string;
    markAsResolved: string;
    editReport: string;
  };
  claims: {
    modalTitle: string;
    explanationLabel: string;
    explanationPlaceholder: string;
    evidenceLabel: string;
    evidencePlaceholder: string;
    submitClaim: string;
    claimsForReport: string;
    noClaimsYet: string;
    statusPending: string;
    statusReview: string;
    statusAccepted: string;
    statusRejected: string;
    statusWithdrawn: string;
    acceptClaim: string;
    rejectClaim: string;
    reviewClaim: string;
    myClaimsTitle: string;
    claimAcceptedNotice: string;
    claimRejectedNotice: string;
  };
  messages: {
    inboxTitle: string;
    noConversations: string;
    selectConversation: string;
    typeMessage: string;
    sendMessage: string;
    safetyReminder: string;
    aboutItem: string;
  };
  notifications: {
    title: string;
    markAllRead: string;
    noNotifications: string;
  };
  profile: {
    myReports: string;
    savedReports: string;
    myClaims: string;
    reportsPublished: string;
    itemsResolved: string;
    editProfile: string;
    bioPlaceholder: string;
    cityPlaceholder: string;
    saveProfile: string;
  };
  settings: {
    title: string;
    interfaceLanguage: string;
    themeMode: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    exportData: string;
    exportDesc: string;
    downloadExport: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    deleteAccountConfirm: string;
  };
  admin: {
    dashboardTitle: string;
    totalUsers: string;
    totalReports: string;
    lostItems: string;
    foundItems: string;
    resolvedItems: string;
    flaggedReports: string;
    moderationQueue: string;
    auditLogs: string;
    noFlaggedContent: string;
    reason: string;
    reportedBy: string;
    actionDismiss: string;
    actionReview: string;
    actionBanUser: string;
    actionDeletePost: string;
    actionUnsuspend: string;
    notesPlaceholder: string;
  };
  safety: {
    reportModalTitle: string;
    selectReason: string;
    reasonFraud: string;
    reasonInappropriate: string;
    reasonHarassment: string;
    reasonSpam: string;
    reasonOther: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    blockUser: string;
    blockConfirm: string;
    communityGuidelinesTitle: string;
  };
}

export const languages: Record<LanguageCode, { name: string; nativeName: string; dir: 'ltr' | 'rtl' }> = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  ckb: { name: 'Kurdish (Sorani)', nativeName: 'کوردیی سۆرانی', dir: 'rtl' },
  kmr: { name: 'Kurdish (Badini)', nativeName: 'کوردی بادینی', dir: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', dir: 'ltr' },
};

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    common: {
      appName: 'Findora',
      tagline: 'Community Lost & Found Network',
      loading: 'Loading...',
      save: 'Save Changes',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      submit: 'Submit',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      back: 'Back',
      viewAll: 'View All',
      learnMore: 'Learn More',
      optional: 'Optional',
      required: 'Required',
      yes: 'Yes',
      no: 'No',
      status: 'Status',
      actions: 'Actions',
      timeAgo: 'ago',
      justNow: 'just now',
      minutesAgo: 'm ago',
      hoursAgo: 'h ago',
      daysAgo: 'd ago',
    },
    nav: {
      home: 'Home',
      explore: 'Explore',
      lostItems: 'Lost Items',
      foundItems: 'Found Items',
      createReport: 'Report Item',
      messages: 'Messages',
      notifications: 'Notifications',
      saved: 'Saved',
      profile: 'Profile',
      settings: 'Settings',
      admin: 'Admin Center',
      login: 'Log In',
      register: 'Sign Up',
      logout: 'Log Out',
    },
    auth: {
      loginTitle: 'Welcome back to Findora',
      loginSubtitle: 'Log in to manage your reports, communicate, and track lost belongings.',
      registerTitle: 'Join our community',
      registerSubtitle: 'Help reunite lost items with their rightful owners safely.',
      fullName: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      forgotPassword: 'Forgot Password?',
      rememberMe: 'Remember me on this browser',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account yet?",
      termsAgreement: 'I agree to the Community Guidelines, Terms of Service, and Privacy Policy',
      termsLink: 'Terms of Service',
      privacyLink: 'Privacy Policy',
      resetPasswordTitle: 'Recover your password',
      resetPasswordSubtitle: 'Enter your account email to receive your recovery instructions.',
      sendResetLink: 'Request Recovery Token',
      enterToken: 'Reset Token',
      newPassword: 'New Password',
      resetSuccess: 'Your password has been reset successfully. Please log in.',
      passwordMinLength: 'Password must be at least 6 characters.',
      passwordsDoNotMatch: 'Passwords do not match.',
      loginSuccess: 'Logged in successfully.',
      registerSuccess: 'Account created successfully.',
    },
    feed: {
      allReports: 'All Items',
      lostFeed: 'Lost Belongings',
      foundFeed: 'Found Belongings',
      resolvedFeed: 'Reunited Items',
      searchPlaceholder: 'Search by keyword, item model, or place...',
      cityFilter: 'Filter by city or district',
      allCategories: 'All Categories',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortMostViewed: 'Most Viewed',
      reportCount: 'items found in community records',
      emptyTitle: 'No community reports yet',
      emptySubtitle: 'Be the first person in your community to report a lost or found item.',
      emptyAction: 'Publish First Report',
      noResultsTitle: 'No matches found',
      noResultsSubtitle: 'Try adjusting your search terms, changing the category, or clearing filters.',
      clearFilters: 'Clear All Filters',
      welcomeHeading: 'Reuniting community belongings with safety and trust',
      welcomeSubtitle: 'Findora connects people who lost valuables with neighbors who found them. Private verification keeps sensitive details secure.',
      reuniteCount: 'items safely resolved',
      howItWorks: 'How Findora Works',
      step1Title: '1. Report an Item',
      step1Desc: 'Describe the item and keep a private secret detail to verify true ownership.',
      step2Title: '2. Search & Connect',
      step2Desc: 'Search community listings and message the finder or owner directly inside the platform.',
      step3Title: '3. Verify & Reunite',
      step3Desc: 'Confirm identifying proof securely before arranging safe handover in a public place.',
    },
    categories: {
      phones_electronics: 'Phones & Electronics',
      wallets_money: 'Wallets & Money',
      keys: 'Keys & Keychains',
      bags_luggage: 'Bags & Luggage',
      documents_id: 'Documents & IDs',
      jewelry_accessories: 'Jewelry & Watches',
      clothing: 'Clothing & Apparel',
      pets: 'Pets & Animals',
      books_school: 'Books & School Supplies',
      vehicles_bikes: 'Vehicles & Bicycles',
      other: 'Other Belongings',
    },
    reportForm: {
      titleLost: 'Report a Lost Item',
      titleFound: 'Report a Found Item',
      typePrompt: 'What kind of report are you publishing?',
      itemLost: 'I Lost an Item',
      itemFound: 'I Found an Item',
      itemTitle: 'Item Title',
      itemTitlePlaceholder: 'e.g., Black Leather Wallet with Student ID',
      category: 'Category',
      selectCategory: 'Select category',
      description: 'Detailed Description',
      descriptionPlaceholder: 'Describe physical features, brand, color, approximate area, and circumstances...',
      city: 'City or Region',
      cityPlaceholder: 'e.g., Erbil, Sulaymaniyah, Baghdad, Istanbul...',
      location: 'Approximate Location',
      locationPlaceholder: 'e.g., Near Central Library or Metro Station',
      date: 'Date Lost or Found',
      uploadPhoto: 'Item Photograph',
      uploadPhotoHint: 'Upload clear photo evidence (JPEG, PNG, max 5MB)',
      secretDetail: 'Private Verification Detail (Recommended)',
      secretDetailHint: 'A distinguishing detail only you know (e.g., wallpaper image, engraving, serial suffix). Kept hidden from the public to verify legitimate claimants.',
      secretDetailWarning: 'Never include bank card numbers, passwords, or home addresses.',
      contactPreference: 'Safe Communication Preference',
      contactInApp: 'In-App Secure Messaging (Recommended)',
      contactEmail: 'Allow In-App Claim Verification',
      preferredLanguage: 'Post Preferred Language',
      submitReport: 'Publish Report',
      updateReport: 'Save Changes',
      safetyNotice: 'For your safety, never publish full ID numbers, home addresses, or credit card details.',
    },
    reportDetail: {
      lostOn: 'Lost on',
      foundOn: 'Found on',
      locationAt: 'Near',
      reportedBy: 'Reported by',
      memberSince: 'Member since',
      statusOpen: 'Active',
      statusMatched: 'Claim Under Review',
      statusResolved: 'Reunited & Resolved',
      statusClosed: 'Closed',
      views: 'views',
      share: 'Share Report',
      bookmark: 'Save',
      like: 'Support',
      reportItem: 'Report Suspicious Post',
      contactFinder: 'Message Finder',
      contactOwner: 'Message Owner',
      claimItem: 'Claim This Item',
      secretDetailTitle: 'Your Private Verification Detail',
      secretDetailDesc: 'Only you and platform administrators can see this detail to check ownership claims.',
      commentsTitle: 'Community Comments & Leads',
      noComments: 'No comments yet. Have information about this item? Leave a helpful comment below.',
      addCommentPlaceholder: 'Add a helpful comment or sighting lead...',
      postComment: 'Send Comment',
      deleteReportConfirm: 'Are you sure you want to permanently delete this report?',
      markAsResolved: 'Mark as Reunited & Resolved',
      editReport: 'Edit Report',
    },
    claims: {
      modalTitle: 'Submit Ownership Claim',
      explanationLabel: 'Why does this item belong to you?',
      explanationPlaceholder: 'Provide distinguishing features, colors, internal contents, or marks not visible in the public photo...',
      evidenceLabel: 'Supporting Evidence Details',
      evidencePlaceholder: 'e.g., Purchase invoice date, IMEI suffix, unique engraving, distinctive scratches...',
      submitClaim: 'Submit Private Claim',
      claimsForReport: 'Ownership Claims for This Item',
      noClaimsYet: 'No ownership claims have been submitted yet.',
      statusPending: 'Pending Review',
      statusReview: 'Under Verification',
      statusAccepted: 'Accepted & Verified',
      statusRejected: 'Declined',
      statusWithdrawn: 'Withdrawn',
      acceptClaim: 'Accept Claim & Resolve',
      rejectClaim: 'Decline Claim',
      reviewClaim: 'Mark In Review',
      myClaimsTitle: 'My Submitted Claims',
      claimAcceptedNotice: 'Your claim was accepted! Contact the finder to coordinate safe handover in a public place.',
      claimRejectedNotice: 'This claim was declined by the finder.',
    },
    messages: {
      inboxTitle: 'Direct Messages',
      noConversations: 'No active conversations yet.',
      selectConversation: 'Select a conversation from the list to start messaging.',
      typeMessage: 'Write a secure message...',
      sendMessage: 'Send',
      safetyReminder: 'Safety Tip: Meet in well-lit public places (police stations, transit hubs). Never send money transfers or PIN codes.',
      aboutItem: 'Regarding Item:',
    },
    notifications: {
      title: 'Notifications',
      markAllRead: 'Mark all as read',
      noNotifications: 'You have no notifications yet.',
    },
    profile: {
      myReports: 'My Reports',
      savedReports: 'Saved Items',
      myClaims: 'My Claims',
      reportsPublished: 'Reports Published',
      itemsResolved: 'Items Reunited',
      editProfile: 'Edit Profile',
      bioPlaceholder: 'Write a brief biography...',
      cityPlaceholder: 'Your city or location...',
      saveProfile: 'Save Profile',
    },
    settings: {
      title: 'Account Settings',
      interfaceLanguage: 'Interface Language',
      themeMode: 'Appearance Theme',
      themeLight: 'Light Theme',
      themeDark: 'Dark Theme',
      themeSystem: 'Match System Preference',
      changePassword: 'Change Password',
      currentPassword: 'Current Password',
      newPassword: 'New Password (min 6 characters)',
      exportData: 'Export Personal Data',
      exportDesc: 'Download a complete JSON record of your reports, comments, claims, and messages.',
      downloadExport: 'Download JSON Data',
      deleteAccount: 'Delete Account',
      deleteAccountDesc: 'Permanently remove your account and all associated personal data from Findora.',
      deleteAccountConfirm: 'Are you completely sure you want to permanently delete your Findora account? This cannot be undone.',
    },
    admin: {
      dashboardTitle: 'Moderation & Safety Center',
      totalUsers: 'Total Users',
      totalReports: 'Total Reports',
      lostItems: 'Lost Items',
      foundItems: 'Found Items',
      resolvedItems: 'Resolved & Reunited',
      flaggedReports: 'Pending Flags',
      moderationQueue: 'Moderation Queue',
      auditLogs: 'Audit Log & Actions',
      noFlaggedContent: 'No pending content reports in the queue.',
      reason: 'Reason',
      reportedBy: 'Reported by',
      actionDismiss: 'Dismiss Report',
      actionReview: 'Mark Reviewed',
      actionBanUser: 'Suspend User',
      actionDeletePost: 'Delete Content',
      actionUnsuspend: 'Unsuspend User',
      notesPlaceholder: 'Moderator notes / rationale...',
    },
    safety: {
      reportModalTitle: 'Report Inappropriate Content',
      selectReason: 'Please select a reason',
      reasonFraud: 'Suspected Fraud or Scam',
      reasonInappropriate: 'Inappropriate or Offensive Material',
      reasonHarassment: 'Harassment or Impersonation',
      reasonSpam: 'Spam or Commercial Solicitation',
      reasonOther: 'Other Community Guideline Violation',
      detailsLabel: 'Additional Details',
      detailsPlaceholder: 'Provide context for our moderation team...',
      blockUser: 'Block User',
      blockConfirm: 'Block this user from messaging you or seeing your reports?',
      communityGuidelinesTitle: 'Findora Community Safety Guidelines',
    },
  },

  ar: {
    common: {
      appName: 'فايندورا',
      tagline: 'شبكة المفقودات والموجودات المجتمعية',
      loading: 'جاري التحميل...',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      delete: 'حذف',
      edit: 'تعديل',
      close: 'إغلاق',
      submit: 'إرسال',
      search: 'بحث',
      filter: 'تصفية',
      all: 'الكل',
      back: 'رجوع',
      viewAll: 'عرض الكل',
      learnMore: 'اعرف المزيد',
      optional: 'اختياري',
      required: 'مطلوب',
      yes: 'نعم',
      no: 'لا',
      status: 'الحالة',
      actions: 'الإجراءات',
      timeAgo: 'مضت',
      justNow: 'الآن',
      minutesAgo: 'د مضت',
      hoursAgo: 'س مضت',
      daysAgo: 'يوم مضت',
    },
    nav: {
      home: 'الرئيسية',
      explore: 'استكشاف',
      lostItems: 'المفقودات',
      foundItems: 'المعثور عليها',
      createReport: 'إبلاغ عن غرض',
      messages: 'الرسائل',
      notifications: 'الإشعارات',
      saved: 'المحفوظات',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      admin: 'لوحة الإشراف',
      login: 'تسجيل الدخول',
      register: 'إنشاء حساب',
      logout: 'تسجيل الخروج',
    },
    auth: {
      loginTitle: 'مرحباً بك مجدداً في فايندورا',
      loginSubtitle: 'سجل دخولك لإدارة بلاغاتك، والتواصل، ومتابعة أغراضك المفقودة.',
      registerTitle: 'انضم إلى مجتمعنا',
      registerSubtitle: 'ساعد في إعادة الأغراض المفقودة إلى أصحابها بكل أمان.',
      fullName: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      forgotPassword: 'نسيت كلمة المرور؟',
      rememberMe: 'تذكرني على هذا المتصفح',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      dontHaveAccount: 'ليس لديك حساب بعد؟',
      termsAgreement: 'أوافق على إرشادات المجتمع وشروط الخدمة وسياسة الخصوصية',
      termsLink: 'شروط الخدمة',
      privacyLink: 'سياسة الخصوصية',
      resetPasswordTitle: 'استعادة كلمة المرور',
      resetPasswordSubtitle: 'أدخل بريدك الإلكتروني لاستلام رمز إعادة التعيين.',
      sendResetLink: 'طلب رمز الاستعادة',
      enterToken: 'رمز الاستعادة',
      newPassword: 'كلمة المرور الجديدة',
      resetSuccess: 'تم تغيير كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.',
      passwordMinLength: 'يجب أن لا تقل كلمة المرور عن 6 أحرف.',
      passwordsDoNotMatch: 'كلمتا المرور غير متطابقتين.',
      loginSuccess: 'تم تسجيل الدخول بنجاح.',
      registerSuccess: 'تم إنشاء الحساب بنجاح.',
    },
    feed: {
      allReports: 'جميع الأغراض',
      lostFeed: 'الأغراض المفقودة',
      foundFeed: 'الأغراض المعثور عليها',
      resolvedFeed: 'الأغراض المستعادة',
      searchPlaceholder: 'ابحث بالكلمات المفتاحية، أو نوع الغرض، أو المكان...',
      cityFilter: 'تصفية حسب المدينة أو المنطقة',
      allCategories: 'جميع الفئات',
      sortNewest: 'الأحدث أولاً',
      sortOldest: 'الأقدم أولاً',
      sortMostViewed: 'الأكثر مشاهدة',
      reportCount: 'أغراض مسجلة في سجلات المجتمع',
      emptyTitle: 'لا توجد بلاغات مجتمعية بعد',
      emptySubtitle: 'كن أول من ينشر بلاغاً عن غرض مفقود أو معثور عليه في مجتمعك.',
      emptyAction: 'نشر أول بلاغ',
      noResultsTitle: 'لم يتم العثور على نتائج',
      noResultsSubtitle: 'جرب تغيير كلمات البحث، أو اختيار فئة أخرى، أو إزالة التصفية.',
      clearFilters: 'مسح جميع التصفية',
      welcomeHeading: 'إعادة الأغراض المفقودة بأمان وثقة مجتمعية',
      welcomeSubtitle: 'فايندورا تربط بين من فقد ممتلكاته وبين من عثر عليها بأمان. ميزة التفاصيل الخاصة تحفظ سرية المعلومات الحساسة.',
      reuniteCount: 'أغراض أعيدت لأصحابها',
      howItWorks: 'كيف تعمل فايندورا',
      step1Title: '١. انشر البلاغ',
      step1Desc: 'صف الغرض مع تحديد تفصيلة سرية خاصة للتحقق من هوية المالك الحقيقي.',
      step2Title: '٢. ابحث وتواصل',
      step2Desc: 'تصفح البلاغات وتواصل بأمان مع المالك أو من عثر على الغرض داخل المنصة.',
      step3Title: '٣. تحقق واستعد',
      step3Desc: 'تأكد من إثبات الملكية بروية قبل التنسيق لتسليم الغرض في مكان عام آمن.',
    },
    categories: {
      phones_electronics: 'الهواتف والإلكترونيات',
      wallets_money: 'المحافظ والنقود',
      keys: 'المفاتيح والميداليات',
      bags_luggage: 'الحقائب والأمتعة',
      documents_id: 'المستندات والهويات',
      jewelry_accessories: 'المجوهرات والساعات',
      clothing: 'الملابس والأزياء',
      pets: 'الحيوانات الأليفة',
      books_school: 'الكتب والأدوات الدراسية',
      vehicles_bikes: 'المركبات والدراجات',
      other: 'مقتنيات أخرى',
    },
    reportForm: {
      titleLost: 'إبلاغ عن غرض مفقود',
      titleFound: 'إبلاغ عن غرض معثور عليه',
      typePrompt: 'ما نوع البلاغ الذي تود نشره؟',
      itemLost: 'فقدت غرضاً',
      itemFound: 'عثرت على غرض',
      itemTitle: 'عنوان الغرض',
      itemTitlePlaceholder: 'مثال: محفظة جلدية سوداء بداخلها بطاقة طالب',
      category: 'الفئة',
      selectCategory: 'اختر الفئة',
      description: 'الوصف التفصيلي',
      descriptionPlaceholder: 'صف المظهر، اللون، الماركة، المنطقة التقريبية والظروف...',
      city: 'المدينة أو المحافظة',
      cityPlaceholder: 'مثال: بغداد، أربيل، البصرة، الموصل، إسطنبول...',
      location: 'الموقع التقريبي',
      locationPlaceholder: 'مثال: قرب المكتبة المركزية أو محطة المترو',
      date: 'تاريخ الفقدان أو العثور',
      uploadPhoto: 'صورة الغرض',
      uploadPhotoHint: 'ارفع صورة حقيقية واضحة (JPEG, PNG، بحد أقصى 5 ميغابايت)',
      secretDetail: 'تفصيلة سرية للتحقق (موصى بها)',
      secretDetailHint: 'تفصيلة مميزة لا يعرفها إلا أنت (مثل صورة الشاشة، نقش خاص، رقم مميز). تبقى مخفية عن العامة للتأكد من المالك الحقيقي.',
      secretDetailWarning: 'يرجى عدم كتابة أرقام البطاقات المصرفية أو كلمات السر أو العناوين المنزلية.',
      contactPreference: 'تفضيل التواصل الآمن',
      contactInApp: 'مراسلة آمنة داخل التطبيق (موصى بها)',
      contactEmail: 'السماح بتقديم طلبات استرداد داخل التطبيق',
      preferredLanguage: 'لغة البلاغ المفضلة',
      submitReport: 'نشر البلاغ',
      updateReport: 'حفظ التعديلات',
      safetyNotice: 'لحمايتك، تجنب نشر الأرقام القومية الكاملة أو أرقام الحسابات البنكية.',
    },
    reportDetail: {
      lostOn: 'فُقد بتاريخ',
      foundOn: 'عُثر عليه بتاريخ',
      locationAt: 'بالقرب من',
      reportedBy: 'نُشر بواسطة',
      memberSince: 'عضو منذ',
      statusOpen: 'نشط',
      statusMatched: 'طلب استرداد قيد المراجعة',
      statusResolved: 'تمت الاستعادة بنجاح',
      statusClosed: 'مغلق',
      views: 'مشاهدة',
      share: 'مشاركة البلاغ',
      bookmark: 'حفظ',
      like: 'دعم',
      reportItem: 'الإبلاغ عن محتوى مشبوه',
      contactFinder: 'مراسلة من عثر عليه',
      contactOwner: 'مراسلة صاحب الغرض',
      claimItem: 'طلب استرداد الغرض',
      secretDetailTitle: 'التفصيلة السرية الخاصة بك للتحقق',
      secretDetailDesc: 'أنت ومشرفو المنصة فقط من يمكنهم رؤية هذه التفصيلة للتحقق من طلبات الاسترداد.',
      commentsTitle: 'تعليقات المجتمع ومعلومات المساعدة',
      noComments: 'لا توجد تعليقات بعد. هل لديك معلومة عن هذا الغرض؟ اترك تعليقاً لمساعدة المالك.',
      addCommentPlaceholder: 'أضف تعليقاً مساعداً أو معلومة...',
      postComment: 'إرسال التعليق',
      deleteReportConfirm: 'هل أنت متأكد من رغبتك في حذف هذا البلاغ نهائياً؟',
      markAsResolved: 'تحديد كغرض مستعاد ومحلول',
      editReport: 'تعديل البلاغ',
    },
    claims: {
      modalTitle: 'تقديم طلب استرداد وإثبات ملكية',
      explanationLabel: 'لماذا هذا الغرض يخصك؟',
      explanationPlaceholder: 'اذكر علامات مميزة، ألوان، تفاصيل داخلية، أو محتويات غير ظاهرة في الصورة العامة...',
      evidenceLabel: 'تفاصيل الأدلة الإضافية',
      evidencePlaceholder: 'مثال: تاريخ الشراء، نقش مميز، خدوش معروفة، كود خاص...',
      submitClaim: 'إرسال طلب الاسترداد السري',
      claimsForReport: 'طلبات الاسترداد لهذا الغرض',
      noClaimsYet: 'لم يتم تقديم أي طلب استرداد حتى الآن.',
      statusPending: 'قيد الانتظار',
      statusReview: 'قيد التحقق',
      statusAccepted: 'مقبول وتم التحقق',
      statusRejected: 'مرفوض',
      statusWithdrawn: 'مسحوب',
      acceptClaim: 'قبول الطلب وإتمام الاسترداد',
      rejectClaim: 'رفض الطلب',
      reviewClaim: 'تحديد قيد المراجعة',
      myClaimsTitle: 'طلبات الاسترداد التي قدمتها',
      claimAcceptedNotice: 'تم قبول طلبك! نسق الآن بأمان مع من عثر على الغرض لتسلمه في مكان عام.',
      claimRejectedNotice: 'تم رفض هذا الطلب من قبل ناشر البلاغ.',
    },
    messages: {
      inboxTitle: 'الرسائل المباشرة',
      noConversations: 'لا توجد محادثات نشطة حالياً.',
      selectConversation: 'اختر محادثة من القائمة للبدء في المراسلة.',
      typeMessage: 'اكتب رسالة آمنة...',
      sendMessage: 'إرسال',
      safetyReminder: 'نصيحة أمان: التقِ دائماً في أماكن عامة مضاءة (مراكز شرطة، محطات قطار). لا ترسل أموالاً أو رموز مرور أبداً.',
      aboutItem: 'بخصوص الغرض:',
    },
    notifications: {
      title: 'الإشعارات',
      markAllRead: 'تحديد الكل كمقروء',
      noNotifications: 'ليس لديك إشعارات جديدة.',
    },
    profile: {
      myReports: 'بلاغاتي',
      savedReports: 'الأغراض المحفوظة',
      myClaims: 'طلبات الاسترداد',
      reportsPublished: 'بلاغات منشورة',
      itemsResolved: 'أغراض أعيدت',
      editProfile: 'تعديل الملف الشخصي',
      bioPlaceholder: 'اكتب نبذة شخصية قصيرة...',
      cityPlaceholder: 'مدينتك أو منطقتك...',
      saveProfile: 'حفظ الملف الشخصي',
    },
    settings: {
      title: 'إعدادات الحساب',
      interfaceLanguage: 'لغة الواجهة',
      themeMode: 'المظهر والسمة',
      themeLight: 'السمة الفاتحة',
      themeDark: 'السمة الداكنة',
      themeSystem: 'مطابقة سمة النظام',
      changePassword: 'تغيير كلمة المرور',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة (6 أحرف على الأقل)',
      exportData: 'تصدير البيانات الشخصية',
      exportDesc: 'قم بتنزيل ملف JSON كامل يحتوي على كافة بلاغاتك وتعليقاتك ورسائلك.',
      downloadExport: 'تنزيل ملف البيانات (JSON)',
      deleteAccount: 'حذف الحساب نهائياً',
      deleteAccountDesc: 'حذف حسابك نهائياً وكافة البيانات المرتبطة به من منصة فايندورا.',
      deleteAccountConfirm: 'هل أنت متأكد تماماً من رغبتك في حذف حسابك نهائياً؟ لا يمكن التراجع عن هذا الإجراء.',
    },
    admin: {
      dashboardTitle: 'مركز الإشراف والأمان',
      totalUsers: 'إجمالي المستخدمين',
      totalReports: 'إجمالي البلاغات',
      lostItems: 'المفقودات',
      foundItems: 'المعثور عليها',
      resolvedItems: 'المستعادة',
      flaggedReports: 'بلاغات قيد الإشراف',
      moderationQueue: 'طابور الإشراف والمراجعة',
      auditLogs: 'سجل العمليات والتدقيق',
      noFlaggedContent: 'لا توجد محتويات مشبوهة في طابور الإشراف حالياً.',
      reason: 'السبب',
      reportedBy: 'أُبلغ بواسطة',
      actionDismiss: 'تجاهل البلاغ',
      actionReview: 'تمت المراجعة',
      actionBanUser: 'تعليق المستخدم',
      actionDeletePost: 'حذف المحتوى',
      actionUnsuspend: 'إلغاء تعليق المستخدم',
      notesPlaceholder: 'ملاحظات المشرف...',
    },
    safety: {
      reportModalTitle: 'الإبلاغ عن محتوى غير لائق',
      selectReason: 'يرجى اختيار السبب',
      reasonFraud: 'شبهة احتيال أو خداع',
      reasonInappropriate: 'محتوى غير لائق أو مسيء',
      reasonHarassment: 'مضايقة أو انتحال شخصية',
      reasonSpam: 'إعلانات ورسائل غير مرغوبة',
      reasonOther: 'انتهاك آخر لإرشادات المجتمع',
      detailsLabel: 'تفاصيل إضافية',
      detailsPlaceholder: 'قدم توضيحاً لفريق الإشراف...',
      blockUser: 'حظر المستخدم',
      blockConfirm: 'هل تريد حظر هذا المستخدم من مراسلتك أو رؤية بلاغاتك؟',
      communityGuidelinesTitle: 'إرشادات الأمان والمجتمع في فايندورا',
    },
  },

  ckb: {
    common: {
      appName: 'فایندۆرا',
      tagline: 'تۆڕی کۆمەڵایەتی دۆزراوە و ونبووەکان',
      loading: 'بارکردن...',
      save: 'پاشەکەوتکردنی گۆڕانکارییەکان',
      cancel: 'هەڵوەشاندنەوە',
      confirm: 'پەسەندکردن',
      delete: 'سڕینەوە',
      edit: 'دەستکاریکردن',
      close: 'داخستن',
      submit: 'ناردن',
      search: 'گەڕان',
      filter: 'فلتەر',
      all: 'هەموو',
      back: 'گەڕانەوە',
      viewAll: 'بینینی هەموو',
      learnMore: 'زیاتر بزانە',
      optional: 'ئارەزوومەندانە',
      required: 'پێویست',
      yes: 'بەڵێ',
      no: 'نەخێر',
      status: 'دۆخ',
      actions: 'کردارەکان',
      timeAgo: 'پێش ئێستا',
      justNow: 'کەمێک لەمەوبەر',
      minutesAgo: 'خولەک پێش ئێستا',
      hoursAgo: 'کاتژمێر پێش ئێستا',
      daysAgo: 'ڕۆژ پێش ئێستا',
    },
    nav: {
      home: 'سەرەکی',
      explore: 'گەڕان و دۆزینەوە',
      lostItems: 'ونبووەکان',
      foundItems: 'دۆزراوەکان',
      createReport: 'ڕاگەیاندنی کەلوپەل',
      messages: 'پەیامەکان',
      notifications: 'ئاگادارییەکان',
      saved: 'پاشەکەوتکراوەکان',
      profile: 'پڕۆفایل',
      settings: 'ڕێکخستنەکان',
      admin: 'ناوەندی بەڕێوەبەر',
      login: 'چوونەژوورەوە',
      register: 'دروستکردنی هەژمار',
      logout: 'چوونەدەرەوە',
    },
    auth: {
      loginTitle: 'بەخێربێیتەوە بۆ فایندۆرا',
      loginSubtitle: 'بچۆ ژوورەوە بۆ بەڕێوەبردنی ڕاپۆرتەکانت و شوێنپێهەڵگرتنی کەلوپەلە ونبووەکانت.',
      registerTitle: 'بەشداربە لە کۆمەڵگەکەمان',
      registerSubtitle: 'یارمەتیدەربە لە گەڕاندنەوەی کەلوپەلە ونبووەکان بۆ خاوەنەکانیان بە سەلامەتی.',
      fullName: 'ناوی تەواو',
      email: 'ناونیشانی ئیمەیڵ',
      password: 'وشەی تێپەڕ',
      confirmPassword: 'دووبارەکردنەوەی وشەی تێپەڕ',
      forgotPassword: 'وشەی تێپەڕت لەبیرچووە؟',
      rememberMe: 'لەبیرم مەبە لەم وێبگەڕەدا',
      alreadyHaveAccount: 'پێشتر هەژمارت دروستکردووە؟',
      dontHaveAccount: 'هێشتا هەژمارت نییە؟',
      termsAgreement: 'ڕازیم بە ڕێنماییەکانی کۆمەڵگە، مەرجەکانی بەکارهێنان و پاراستنی نهێنی',
      termsLink: 'مەرجەکانی بەکارهێنان',
      privacyLink: 'پاراستنی نهێنی',
      resetPasswordTitle: 'گێڕانەوەی وشەی تێپەڕ',
      resetPasswordSubtitle: 'ئیمەیڵەکەت بنووسە بۆ وەرگرتنی کۆدی گۆڕینی وشەی تێپەڕ.',
      sendResetLink: 'داواکردنی کۆدی گێڕانەوە',
      enterToken: 'کۆدی گێڕانەوە',
      newPassword: 'وشەی تێپەڕی نوێ',
      resetSuccess: 'وشەی تێپەڕ بەسەرکەوتوویی گۆڕدرا. ئێستا دەتوانیت بچیتە ژوورەوە.',
      passwordMinLength: 'پێویستە وشەی تێپەڕ لانی کەم ٦ پیت بێت.',
      passwordsDoNotMatch: 'وشە نهێنییەکان وەک یەک نین.',
      loginSuccess: 'بەسەرکەوتوویی چوویتە ژوورەوە.',
      registerSuccess: 'هەژمارەکەت بەسەرکەوتوویی دروستکرا.',
    },
    feed: {
      allReports: 'هەموو کەلوپەلەکان',
      lostFeed: 'کەلوپەلە ونبووەکان',
      foundFeed: 'کەلوپەلە دۆزراوەکان',
      resolvedFeed: 'گەڕێنراوەکان',
      searchPlaceholder: 'بگەڕێ بەپێی وشە، جۆری شتومەک، یان شوێن...',
      cityFilter: 'فلتەرکردن بەپێی شار یان ناوچە',
      allCategories: 'هەموو بەشەکان',
      sortNewest: 'نوێترین',
      sortOldest: 'کۆنترین',
      sortMostViewed: 'زۆرترین بینراو',
      reportCount: 'کەلوپەل تۆمارکراوە لە تۆمارەکاندا',
      emptyTitle: 'هێشتا هیچ ڕاپۆرتێک تۆمار نەکراوە',
      emptySubtitle: 'ببە بە یەکەم کەس لە شارەکەتدا کە ڕاپۆرتی کەلوپەلێکی ونبوو یان دۆزراوە بڵاودەکاتەوە.',
      emptyAction: 'یەکەم ڕاپۆرت بڵاوبکەرەوە',
      noResultsTitle: 'هیچ ئەنجامێک نەدۆزرایەوە',
      noResultsSubtitle: 'وشەکانی گەڕان بگۆڕە یان فلتەرەکان پاک بکەرەوە.',
      clearFilters: 'پاککردنەوەی فلتەرەکان',
      welcomeHeading: 'گەڕاندنەوەی کەلوپەلی هاوڵاتیان بە متمانە و پارێزراوی',
      welcomeSubtitle: 'فایندۆرا پەیوەندی دروستدەکات لەنێوان ئەوانەی شتیان لێ ونبووە و ئەوانەی دۆزیویانەتەوە.',
      reuniteCount: 'کەلوپەل گەڕێندراونەتەوە بۆ خاوەنەکانیان',
      howItWorks: 'فایندۆرا چۆن کاردەکات؟',
      step1Title: '١. ڕاپۆرتێک بنووسە',
      step1Desc: 'وەسفی شتەکە بکە و نیشانەیەکی تایبەت بە نهێنی بهێڵەرەوە بۆ سەلماندنی خاوەندارێتی.',
      step2Title: '٢. بگەڕێ و پەیوەندی بکە',
      step2Desc: 'سەیری ڕاپۆرتەکان بکە و لەناو سیستەمەکەدا گفتوگۆ بکە بە پارێزراوی.',
      step3Title: '٣. پشتڕاستکردنەوە و گەڕاندنەوە',
      step3Desc: 'پێش ڕادەستکردنەوە لە شوێنێکی گشتی، بەڵگەی خاوەندارێتی پشتڕاست بکەرەوە.',
    },
    categories: {
      phones_electronics: 'مۆبایل و ئەلیکترۆنیات',
      wallets_money: 'جزدان و پارە',
      keys: 'کلیل و مەدالیا',
      bags_luggage: 'جانتا و کەلوپەلی گەشت',
      documents_id: 'بەڵگەنامە و ناسنامەکان',
      jewelry_accessories: 'زێڕ و کاتژمێر',
      clothing: 'جلوبەرگ و پۆشاک',
      pets: 'ئاژەڵی ماڵی',
      books_school: 'کتێب و پێداویستی خوێندن',
      vehicles_bikes: 'ئۆتۆمبێل و پاسکیل',
      other: 'شتومەکی تر',
    },
    reportForm: {
      titleLost: 'ڕاگەیاندنی کەلوپەلی ونبوو',
      titleFound: 'ڕاگەیاندنی کەلوپەلی دۆزراوە',
      typePrompt: 'دەتەوێت چ جۆرە ڕاپۆرتێک بڵاوبکەیتەوە؟',
      itemLost: 'شتێکم لێ ونبووە',
      itemFound: 'شتێکم دۆزیوەتەوە',
      itemTitle: 'ناونیشانی کەلوپەلەکە',
      itemTitlePlaceholder: 'بۆ نموونە: جزدانی چەرمی ڕەش بە ناسنامەی خوێندکارییەوە',
      category: 'بەش',
      selectCategory: 'بەشێک هەڵبژێرە',
      description: 'وەسفی تەواو',
      descriptionPlaceholder: 'وەسفی شێوە، ڕەنگ، شوێنی نزیکەیی و چۆنیەتی ڕووداوەکە بکە...',
      city: 'شار یان پارێزگا',
      cityPlaceholder: 'بۆ نموونە: هەولێر، سلێمانی، دهۆک، کەرکووک، بەغدا...',
      location: 'شوێنی نزیکەیی',
      locationPlaceholder: 'بۆ نموونە: نزیک کتێبخانەی گشتی یان وێستگەی پاس',
      date: 'بەرواری ونبوون یان دۆزینەوە',
      uploadPhoto: 'وێنەی کەلوپەل',
      uploadPhotoHint: 'وێنەیەکی ڕاستەقینە و ڕوون باربکە (JPEG, PNG تا 5MB)',
      secretDetail: 'نیشانەی نهێنی بۆ سەلماندن (پێشنیارکراو)',
      secretDetailHint: 'نیشانەیەکی تایبەت کە تەنها تۆ دەیزانیت (وەک وێنەی شاشە یان نیشانەیەکی تایبەت). لە خەڵکی دەشاردرێتەوە بۆ پشتڕاستکردنەوەی خاوەنی ڕاستەقینە.',
      secretDetailWarning: 'تکایە ژمارەی کارتی بانک، وشەی تێپەڕ، یان ناونیشانی ماڵ مەنووسە.',
      contactPreference: 'شێوازی پەیوەندی پارێزراو',
      contactInApp: 'نامەگۆڕینەوەی پارێزراو لەناو ئەپڵیکەیشن (پێشنیارکراو)',
      contactEmail: 'ڕێگەدان بە داواکاری سەلماندن لەناو ئەپڵیکەیشن',
      preferredLanguage: 'زمانی پەسەندکراوی پۆست',
      submitReport: 'بڵاوکردنەوەی ڕاپۆرت',
      updateReport: 'پاشەکەوتکردنی دەستکارییەکان',
      safetyNotice: 'بۆ سەلامەتی خۆت، هەرگیز زانیاری تایبەتی بانکی یان ژمارەی نهێنی بڵاو مەکەرەوە.',
    },
    reportDetail: {
      lostOn: 'ونبووە لە بەرواری',
      foundOn: 'دۆزراوەتەوە لە بەرواری',
      locationAt: 'نزیک لە',
      reportedBy: 'بڵاوکراوەتەوە لەلایەن',
      memberSince: 'ئەندامە لەوەتەی',
      statusOpen: 'چالاکە',
      statusMatched: 'داواکاری لەژێر پێداچوونەوەدایە',
      statusResolved: 'گەڕێنراوەتەوە و چارەسەرکرا',
      statusClosed: 'داخراوە',
      views: 'بینین',
      share: 'هاوبەشکردن',
      bookmark: 'پاشەکەوت',
      like: 'پشتیوانی',
      reportItem: 'سکاڵا لەسەر ناوەڕۆک',
      contactFinder: 'نامە بنێرە بۆ دۆزەرەوە',
      contactOwner: 'نامە بنێرە بۆ خاوەنی کەلوپەل',
      claimItem: 'داواکردنی خاوەندارێتی ئەم کەلوپەلە',
      secretDetailTitle: 'نیشانەی نهێنی تایبەت بە تۆ بۆ سەلماندن',
      secretDetailDesc: 'تەنها تۆ و بەڕێوەبەرانی سیستمەکە دەتوانن ئەم زانیارییە نهێنییە ببینن.',
      commentsTitle: 'بۆچوون و زانیاری هاوڵاتیان',
      noComments: 'هێشتا هیچ بۆچوونێک نییە. زانیاریت لەسەر ئەم کەلوپەلە هەیە؟ لێرەدا بینوسە.',
      addCommentPlaceholder: 'بۆچوونێک یان زانیارییەکی یارمەتیدەر بنووسە...',
      postComment: 'ناردنی بۆچوون',
      deleteReportConfirm: 'دڵنیایت لە سڕینەوەی یەکجارەکی ئەم ڕاپۆرتە؟',
      markAsResolved: 'دیاریکردن وەک گەڕێنراوە و چارەسەرکراو',
      editReport: 'دەستکاریکردنی ڕاپۆرت',
    },
    claims: {
      modalTitle: 'پێشکەشکردنی داوای خاوەندارێتی و سەلماندن',
      explanationLabel: 'بۆچی ئەم کەلوپەلە هی تۆیە؟',
      explanationPlaceholder: 'نیشانەی جیاکەرەوە، ڕەنگەکان، یان ناوەڕۆکێک کە لە وێنە گشتییەکەدا دیار نییە بنووسە...',
      evidenceLabel: 'بەڵگە و زانیاری زیاتر',
      evidencePlaceholder: 'بۆ نموونە: بەرواری کڕین، نووسینی تایبەت، شوێنەواری تایبەت...',
      submitClaim: 'ناردنی داواکاری نهێنی',
      claimsForReport: 'داواکارییەکانی خاوەندارێتی بۆ ئەم شتە',
      noClaimsYet: 'تا ئێستا هیچ داواکارییەکی سەلماندن پێشکەش نەکراوە.',
      statusPending: 'چاوەڕوانکراو',
      statusReview: 'لەژێر پێداچوونەوەدا',
      statusAccepted: 'پەسەندکرا و سەلمێنرا',
      statusRejected: 'ڕەتکرایەوە',
      statusWithdrawn: 'کشێنراوەتەوە',
      acceptClaim: 'پەسەندکردنی داواکاری و گەڕاندنەوە',
      rejectClaim: 'ڕەتکردنەوەی داواکاری',
      reviewClaim: 'دانان لەژێر پێداچوونەوە',
      myClaimsTitle: 'داواکارییە پێشکەشکراوەکانم',
      claimAcceptedNotice: 'داواکارییەکەت پەسەندکرا! ئێستا پەیوەندی بکە بۆ وەرگرتنەوە لە شوێنێکی گشتیدا.',
      claimRejectedNotice: 'ئەم داواکارییە لەلایەن دۆزەرەوە ڕەتکرایەوە.',
    },
    messages: {
      inboxTitle: 'پەیامە ڕاستەوخۆکان',
      noConversations: 'هیچ گفتوگۆیەکی چالاک نییە لە ئێستادا.',
      selectConversation: 'گفتوگۆیەک هەڵبژێرە بۆ دەستپێکردنی نامەگۆڕینەوە.',
      typeMessage: 'نامەیەکی پارێزراو بنووسە...',
      sendMessage: 'ناردن',
      safetyReminder: 'ئامۆژگاری سەلامەتی: هەمیشە لە شوێنی گشتی ڕووناک یەکتر ببینن. هەرگیز پارە یان کۆدی نهێنی مەنێرن.',
      aboutItem: 'دەربارەی کەلوپەلی:',
    },
    notifications: {
      title: 'ئاگادارییەکان',
      markAllRead: 'دیاریکردنی هەموو وەک خوێندراوە',
      noNotifications: 'هیچ ئاگادارییەکی نوێت نییە.',
    },
    profile: {
      myReports: 'ڕاپۆرتەکانم',
      savedReports: 'کەلوپەلە پارێزراوەکان',
      myClaims: 'داواکارییەکانم',
      reportsPublished: 'ڕاپۆرتی بڵاوکراوە',
      itemsResolved: 'گەڕێنراوەتەوە',
      editProfile: 'دەستکاریکردنی پڕۆفایل',
      bioPlaceholder: 'کورتەیەک دەربارەی خۆت بنووسە...',
      cityPlaceholder: 'شار یان ناوچەکەت...',
      saveProfile: 'پاشەکەوتکردنی پڕۆفایل',
    },
    settings: {
      title: 'ڕێکخستنەکانی هەژمار',
      interfaceLanguage: 'زمانی بەرنامە',
      themeMode: 'ڕووکار و ڕەنگ',
      themeLight: 'ڕووکاری ڕووناک',
      themeDark: 'ڕووکاری تاریک',
      themeSystem: 'هاوتا لەگەڵ سیستەم',
      changePassword: 'گۆڕینی وشەی تێپەڕ',
      currentPassword: 'وشەی تێپەڕی ئێستا',
      newPassword: 'وشەی تێپەڕی نوێ (لانی کەم ٦ پیت)',
      exportData: 'دەرهێنانی داتای تایبەتی',
      exportDesc: 'دابەزاندنی فایلی تەواوی JSON کە ڕاپۆرتەکان، کۆمێنتەکان و پەیامەکانت لەخۆدەگرێت.',
      downloadExport: 'دابەزاندنی داتای JSON',
      deleteAccount: 'سڕینەوەی یەکجارەکی هەژمار',
      deleteAccountDesc: 'سڕینەوەی یەکجارەکی هەژمارەکەت و تەواوی داتاکانت لە سیستەمی فایندۆرا.',
      deleteAccountConfirm: 'بە تەواوی دڵنیایت لە سڕینەوەی هەژمارەکەت؟ ئەم کارە ناگەڕێتەوە.',
    },
    admin: {
      dashboardTitle: 'ناوەندی بەڕێوەبردن و سەلامەتی',
      totalUsers: 'کۆی بەکارهێنەران',
      totalReports: 'کۆی ڕاپۆرتەکان',
      lostItems: 'کەلوپەلی ونبوو',
      foundItems: 'کەلوپەلی دۆزراوە',
      resolvedItems: 'کەلوپەلی چارەسەرکراو',
      flaggedReports: 'ڕاپۆرتی سکاڵالێکراو',
      moderationQueue: 'ڕیزی پێداچوونەوەی ناوەڕۆک',
      auditLogs: 'تۆماری کردارەکانی بەڕێوەبەر',
      noFlaggedContent: 'هیچ ناوەڕۆکێکی سکاڵالێکراو نییە لە ڕیزەکەدا.',
      reason: 'هۆکار',
      reportedBy: 'سکاڵاکار',
      actionDismiss: 'ڕەتکردنەوەی سکاڵا',
      actionReview: 'پێداچوونەوە کرا',
      actionBanUser: 'ڕاگرتنی بەکارهێنەر',
      actionDeletePost: 'سڕینەوەی ناوەڕۆک',
      actionUnsuspend: 'چالاککردنەوەی بەکارهێنەر',
      notesPlaceholder: 'تێبینییەکانی سەرپەرشتیار...',
    },
    safety: {
      reportModalTitle: 'سکاڵا لەسەر ناوەڕۆکی نەشیاو',
      selectReason: 'تکایە هۆکارێک هەڵبژێرە',
      reasonFraud: 'گومان لە فێڵکردن یان ساختەکاری',
      reasonInappropriate: 'ناوەڕۆکی نەشیاو یان بێزارکەر',
      reasonHarassment: 'هەراسانکردن یان خۆکردن بە کەسێکی تر',
      reasonSpam: 'ڕیکلامی بێزارکەر',
      reasonOther: 'پێشێلکارییەکی تری ڕێنماییەکان',
      detailsLabel: 'زانیاری زیاتر',
      detailsPlaceholder: 'ڕوونکردنەوە بدە بۆ تیمی بەڕێوەبردن...',
      blockUser: 'بلۆککردنی بەکارهێنەر',
      blockConfirm: 'دەتەوێت ئەم بەکارهێنەرە بلۆک بکەیت تا نەتوانێت نامەت بۆ بنێرێت؟',
      communityGuidelinesTitle: 'ڕێنماییەکانی سەلامەتی کۆمەڵگەی فایندۆرا',
    },
  },

  kmr: {
    common: {
      appName: 'Findora',
      tagline: 'Torra Civakî ya Tiştên Wenda û Peydabûyî',
      loading: 'Tê barkirin...',
      save: 'Guhertinan Tomar Bike',
      cancel: 'Betal Bike',
      confirm: 'Pêşwazî Bike',
      delete: 'Jê Bibe',
      edit: 'Serast Bike',
      close: 'Bigire',
      submit: 'Bişîne',
      search: 'Lêgerîn',
      filter: 'Fîlter',
      all: 'Hemû',
      back: 'Vegere',
      viewAll: 'Hemûyan Bibîne',
      learnMore: 'Pêzanînên Zêdetir',
      optional: 'Li gor dilê xwe',
      required: 'Pêdivî ye',
      yes: 'Erê',
      no: 'Na',
      status: 'Rewş',
      actions: 'Çalakî',
      timeAgo: 'berê',
      justNow: 'hinek berê',
      minutesAgo: 'xulek berê',
      hoursAgo: 'demjimêr berê',
      daysAgo: 'roj berê',
    },
    nav: {
      home: 'Serî',
      explore: 'Geryan',
      lostItems: 'Tiştên Wenda',
      foundItems: 'Tiştên Hatine Dîtin',
      createReport: 'Raportek Tomar Bike',
      messages: 'Peyam',
      notifications: 'Hişyarkerî',
      saved: 'Hatî Tomarkirin',
      profile: 'Profîl',
      settings: 'Mîhengan',
      admin: 'Rêvebirî',
      login: 'Têkeve',
      register: 'Hesabek Çêbike',
      logout: 'Derkeve',
    },
    auth: {
      loginTitle: 'Bi xêr hatî bo Findora',
      loginSubtitle: 'Têkeve bo birêvebirina raportên xwe û dîtina tiştên wenda.',
      registerTitle: 'Tevlî civata me bibe',
      registerSubtitle: 'Alîkar be da ku tiştên wenda bi awayekî ewle bigihîjin xwediyên xwe.',
      fullName: 'Nav û Paşnav',
      email: 'Navnîşana E-nameyê',
      password: 'Şîfre',
      confirmPassword: 'Şîfreyê Dubare Bike',
      forgotPassword: 'Te şîfreya xwe ji bîr kiriye?',
      rememberMe: 'Min di vî gerokê de bîne bîra xwe',
      alreadyHaveAccount: 'Hesabê te yê heyî heye?',
      dontHaveAccount: 'Hêj hesabê te nîne?',
      termsAgreement: 'Ez bi rêzikên civatê, mercên bikaranînê û parastina agahiyan qayil im',
      termsLink: 'Mercên Bikaranînê',
      privacyLink: 'Parastina Agahiyan',
      resetPasswordTitle: 'Vegera Şîfreyê',
      resetPasswordSubtitle: 'E-nameya xwe binivîse da ku koda vegera şîfreyê ji te re were şandin.',
      sendResetLink: 'Koda Vegerê Bixwaze',
      enterToken: 'Koda Vegerê',
      newPassword: 'Şîfreya Nû',
      resetSuccess: 'Şîfreya te bi serkeftî hate guhertin. Niha dikarî têkevî.',
      passwordMinLength: 'Divê şîfre ji 6 tîpan kêmtir nebe.',
      passwordsDoNotMatch: 'Şîfre hev nagirin.',
      loginSuccess: 'Bi serkeftî têketî.',
      registerSuccess: 'Hesabê te bi serkeftî çêbû.',
    },
    feed: {
      allReports: 'Hemû Tişt',
      lostFeed: 'Tiştên Wenda Bûyî',
      foundFeed: 'Tiştên Hatine Dîtin',
      resolvedFeed: 'Tiştên Vegeriyayî',
      searchPlaceholder: 'Li gor peyv, corê tiştan, yan cîh bigere...',
      cityFilter: 'Li gor bajar yan navçeyê fîlter bike',
      allCategories: 'Hemû Kategorî',
      sortNewest: 'Ya herî nû',
      sortOldest: 'Ya herî kevn',
      sortMostViewed: 'Herî Zêde Dîtî',
      reportCount: 'tişt di tomarên civakê de hatine qeydkirin',
      emptyTitle: 'Hêj ti raportek civakê nehatiye tomarkirin',
      emptySubtitle: 'Bibe yekem kes di herêma xwe de ku raporta tiştekî wenda yan peydabûyî belav dike.',
      emptyAction: 'Raporta Yekem Belav Bike',
      noResultsTitle: 'Ti encam nehat dîtin',
      noResultsSubtitle: 'Peyvên lêgerînê biguhêre yan jî fîlteran paqij bike.',
      clearFilters: 'Fîlteran Paqij Bike',
      welcomeHeading: 'Vegera tiştên civakê bi ewlehî û baweriyê',
      welcomeSubtitle: 'Findora pêwendiyê di navbera kesên tiştên wan wendabûyî û kesên peydakirî de saz dike bi parastina hûrguliyên taybet.',
      reuniteCount: 'tişt bi ewlehî hatine vegerandin',
      howItWorks: 'Findora Çawa Kar Dike?',
      step1Title: '1. Raportek Tomar Bike',
      step1Desc: 'Şiroveya tiştan bike û nîşanek nehênî bihêle bo selmandina xwedîtiyê.',
      step2Title: '2. Lêbigere û Peywendî Bike',
      step2Desc: 'Di nav lîsteyan de lêbigere û bi awayekî ewle di nav sîstemê de peyaman bişîne.',
      step3Title: '3. Piştrast Bike û Werbigire',
      step3Desc: 'Beriya radestkirina li cîhekî gelemperî, belgeya xwedîtiyê piştrast bike.',
    },
    categories: {
      phones_electronics: 'Mobaîl û Elektronîk',
      wallets_money: 'Cizdan û Pere',
      keys: 'Kilît û Medalyon',
      bags_luggage: 'Çente û Valîz',
      documents_id: 'Belgename û Nasname',
      jewelry_accessories: 'Zêr û Saet',
      clothing: 'Cil û Berg',
      pets: 'Ajalên Kedî',
      books_school: 'Pirtûk û Pêdiviyên Dibistanê',
      vehicles_bikes: 'Otomobîl û Duçerxe',
      other: 'Tiştên Din',
    },
    reportForm: {
      titleLost: 'Raportkirina Tiştê Wenda',
      titleFound: 'Raportkirina Tiştê Peydabûyî',
      typePrompt: 'Tu dixwazî çi cor raport belav bikî?',
      itemLost: 'Tiştek ji min wenda bûye',
      itemFound: 'Min tiştek peyda kiriye',
      itemTitle: 'Sernavê Tiştan',
      itemTitlePlaceholder: 'mînak: Cizdanê çerm ê reş bi nasnameya xwendekariyê ve',
      category: 'Kategorî',
      selectCategory: 'Kategoriyek hilbijêre',
      description: 'Şiroveya Berfireh',
      descriptionPlaceholder: 'Reng, nîşan, derdora nêzîk û çawaniya bûyerê binivîse...',
      city: 'Bajar yan Parêzgeh',
      cityPlaceholder: 'mînak: Dihok, Zaxo, Hewlêr, Silêmanî, Stenbol...',
      location: 'Cîhê Nêzîk',
      locationPlaceholder: 'mînak: Nêzîkî pirtûkxaneya navendî yan rawestgeha otobusê',
      date: 'Dîroka Wendabûnê yan Dîtinê',
      uploadPhoto: 'Wêneyê Tiştan',
      uploadPhotoHint: 'Wêneyekî zelal û rast barke (JPEG, PNG heta 5MB)',
      secretDetail: 'Nîşana Veşartî bo Piştrastkirinê (Pêşniyarkirî)',
      secretDetailHint: 'Nîşanek taybet ku tenê tu dizanî (wek wêneyê ser ekranê yan nîşanek hindur). Ji hemû kesan tê veşartin da ku tenê xwediyê rast were piştrastkirin.',
      secretDetailWarning: 'Ji kerema xwe hejmarên kartên bankê, şîfreyan an navnîşana malê nenivîse.',
      contactPreference: 'Rêbaza Pêwendiya Ewle',
      contactInApp: 'Peyamên ewle di nav bernameyê de (Pêşniyarkirî)',
      contactEmail: 'Destûr bide daxwazên piştrastkirinê di bernameyê de',
      preferredLanguage: 'Zimanê raportê yê dilxwaz',
      submitReport: 'Raportê Belav Bike',
      updateReport: 'Guhertinan Tomar Bike',
      safetyNotice: 'Ji bo ewlehiya xwe, ti carî agahiyên bankî yên nehênî belav neke.',
    },
    reportDetail: {
      lostOn: 'Wenda bû di roja',
      foundOn: 'Hate dîtin di roja',
      locationAt: 'Nêzîkî',
      reportedBy: 'Hate tomarkirin ji aliyê',
      memberSince: 'Endam e ji roja',
      statusOpen: 'Çalak e',
      statusMatched: 'Daxwaz tê lêkolînkirin',
      statusResolved: 'Vegeriya bo xwedî',
      statusClosed: 'Girtî ye',
      views: 'dîtin',
      share: 'Parve Bike',
      bookmark: 'Tomar',
      like: 'Piştgirî',
      reportItem: 'Raportkirina Naveroka Bêrêz',
      contactFinder: 'Peyamê ji dîtinvan re bişîne',
      contactOwner: 'Peyamê ji xwediyê tiştan re bişîne',
      claimItem: 'Daxwaza Xwedîtiya Vî Tiştî Bike',
      secretDetailTitle: 'Nîşana te ya nehênî bo piştrastkirinê',
      secretDetailDesc: 'Tenê tu û rêvebirên sîstemê dikarin vê nîşanê bibînin bo kontrolkirina daxwazan.',
      commentsTitle: 'Şirove û Nêrînên Civakê',
      noComments: 'Hêj ti şirove nîne. Pêzanînek te li ser vî tiştî heye? Li vir binivîse.',
      addCommentPlaceholder: 'Şiroveyek alîkar binivîse...',
      postComment: 'Şiroveyê Bişîne',
      deleteReportConfirm: 'Tu piştrast î ku dixwazî vê raportê bi temamî jê bibî?',
      markAsResolved: 'Wek Çareserkirî Tomar Bike',
      editReport: 'Raportê Serast Bike',
    },
    claims: {
      modalTitle: 'Pêşkêşkirina Daxwaza Xwedîtiyê',
      explanationLabel: 'Çima ev tişt ê te ye?',
      explanationPlaceholder: 'Nîşanên taybet, rengan, yan naverokek ku di wêneya gelemperî de nexuya ye binivîse...',
      evidenceLabel: 'Hûrguliyên Belgeyan',
      evidencePlaceholder: 'mînak: Dîroka kirînê, koda taybet, deqên naskirî...',
      submitClaim: 'Daxwaza Nehênî Bişîne',
      claimsForReport: 'Daxwazên Xwedîtiyê bo vî tiştî',
      noClaimsYet: 'Hêj ti daxwaz nehatiye pêşkêşkirin.',
      statusPending: 'Li bendê ye',
      statusReview: 'Di kontrolê de ye',
      statusAccepted: 'Hate pejirandin',
      statusRejected: 'Hate redkirin',
      statusWithdrawn: 'Paşve hate kişandin',
      acceptClaim: 'Daxwazê Pejirîne û Bigihîne Xwedî',
      rejectClaim: 'Daxwazê Red Bike',
      reviewClaim: 'Bixe bin çavdêriyê',
      myClaimsTitle: 'Daxwazên Min ên Pêşkêşkirî',
      claimAcceptedNotice: 'Daxwaza te hate pejirandin! Li cîhekî gelemperî pêwendî bike bo wergirtina tiştên xwe.',
      claimRejectedNotice: 'Ev daxwaz hate redkirin ji aliyê belavker ve.',
    },
    messages: {
      inboxTitle: 'Peyamên Rastewxo',
      noConversations: 'Hêj ti guftûgoyek çalak nîne.',
      selectConversation: 'Danûstandinekê hilbijêre da ku dest bi şandina peyaman bikî.',
      typeMessage: 'Peyamek ewle binivîse...',
      sendMessage: 'Bişîne',
      safetyReminder: 'Şîreta Ewlehiyê: Her tim li cihên gelemperî yên ronî hev bibînin. Qet pereyan an şîfreyan neşînin.',
      aboutItem: 'Derbarê Tiştê:',
    },
    notifications: {
      title: 'Hişyarkerî',
      markAllRead: 'Hemûyan wek xwendî nîşan bike',
      noNotifications: 'Ti hişyariyek te ya nû nîne.',
    },
    profile: {
      myReports: 'Raportên Min',
      savedReports: 'Tiştên Tomarkirî',
      myClaims: 'Daxwazên Min',
      reportsPublished: 'Raportên Belavbûyî',
      itemsResolved: 'Tiştên Vegeriyayî',
      editProfile: 'Profîlê Serast Bike',
      bioPlaceholder: 'Kurteyek li ser xwe binivîse...',
      cityPlaceholder: 'Bajar yan navçeya te...',
      saveProfile: 'Profîlê Tomar Bike',
    },
    settings: {
      title: 'Mîhengên Hesabê',
      interfaceLanguage: 'Zimanê Bernameyê',
      themeMode: 'Rûkar û Reng',
      themeLight: 'Rûkarê Ronahî',
      themeDark: 'Rûkarê Tarî',
      themeSystem: 'Wek sîstemê bike',
      changePassword: 'Şîfreyê Guhêrîne',
      currentPassword: 'Şîfreya Heyî',
      newPassword: 'Şîfreya Nû (kêmtirîn 6 tîp)',
      exportData: 'Derxistina Agahiyên Kesane',
      exportDesc: 'Daxistina pelê JSON yê tevahiya raport, peyam û şiroveyên te.',
      downloadExport: 'Pelê JSON Daxîne',
      deleteAccount: 'Hesabê Bi Temamî Jê Bibe',
      deleteAccountDesc: 'Jêbirina herdemî ya hesab û tevahiya agahiyên te ji Findora.',
      deleteAccountConfirm: 'Tu bi temamî piştrast î ku dixwazî hesabê xwe jê bibî? Ev çalakî paşve nayê.',
    },
    admin: {
      dashboardTitle: 'Navenda Çavdêrî û Ewlehiyê',
      totalUsers: 'Hemû Bikarhêner',
      totalReports: 'Hemû Raport',
      lostItems: 'Tiştên Wenda',
      foundItems: 'Tiştên Dîtî',
      resolvedItems: 'Tiştên Vegeriyayî',
      flaggedReports: 'Raportên bi Gilî',
      moderationQueue: 'Rêza Çavdêriyê',
      auditLogs: 'Tomara Çalakiyan',
      noFlaggedContent: 'Ti naverokek bi gilî di rêzê de nîne.',
      reason: 'Sedem',
      reportedBy: 'Gilîker',
      actionDismiss: 'Giliyê Paşguh Bike',
      actionReview: 'Hate Kontrolkirin',
      actionBanUser: 'Hesab Ragire',
      actionDeletePost: 'Naverokê Jê Bibe',
      actionUnsuspend: 'Hesab Çalak Bike',
      notesPlaceholder: 'Têbiniyên çavdêr...',
    },
    safety: {
      reportModalTitle: 'Gilîkirina Naveroka Nelihev',
      selectReason: 'Ji kerema xwe sedemek hilbijêre',
      reasonFraud: 'Guman li ser xapandinê',
      reasonInappropriate: 'Naveroka nepêwîst yan bêrêz',
      reasonHarassment: 'Bêzarkirin yan diziya nasnameyê',
      reasonSpam: 'Agahiyên nehewce û reklam',
      reasonOther: 'Binpêkirineke din',
      detailsLabel: 'Zanyariyên Zêdetir',
      detailsPlaceholder: 'Şirove bike bo tîma çavdêriyê...',
      blockUser: 'Bikarhêner Asteng Bike',
      blockConfirm: 'Tu dixwazî vî bikarhênerî asteng bikî da ku peyaman neşîne?',
      communityGuidelinesTitle: 'Rêzikên Ewlehiya Civaka Findora',
    },
  },

  tr: {
    common: {
      appName: 'Findora',
      tagline: 'Topluluk Kayıp & Buluntu Ağı',
      loading: 'Yükleniyor...',
      save: 'Değişiklikleri Kaydet',
      cancel: 'İptal',
      confirm: 'Onayla',
      delete: 'Sil',
      edit: 'Düzenle',
      close: 'Kapat',
      submit: 'Gönder',
      search: 'Ara',
      filter: 'Filtrele',
      all: 'Tümü',
      back: 'Geri',
      viewAll: 'Tümünü Gör',
      learnMore: 'Daha Fazla Bilgi',
      optional: 'İsteğe Bağlı',
      required: 'Gerekli',
      yes: 'Evet',
      no: 'Hayır',
      status: 'Durum',
      actions: 'İşlemler',
      timeAgo: 'önce',
      justNow: 'az önce',
      minutesAgo: 'dk önce',
      hoursAgo: 'sa önce',
      daysAgo: 'gün önce',
    },
    nav: {
      home: 'Ana Sayfa',
      explore: 'Keşfet',
      lostItems: 'Kayıp Eşyalar',
      foundItems: 'Bulunan Eşyalar',
      createReport: 'İlan Oluştur',
      messages: 'Mesajlar',
      notifications: 'Bildirimler',
      saved: 'Kaydedilenler',
      profile: 'Profil',
      settings: 'Ayarlar',
      admin: 'Yönetim Paneli',
      login: 'Giriş Yap',
      register: 'Kayıt Ol',
      logout: 'Çıkış Yap',
    },
    auth: {
      loginTitle: "Findora'ya Tekrar Hoş Geldiniz",
      loginSubtitle: 'İlanlarınızı yönetmek, mesajlaşmak ve kayıp eşyalarınızı takip etmek için giriş yapın.',
      registerTitle: 'Topluluğumuza Katılın',
      registerSubtitle: 'Kayıp eşyaların gerçek sahiplerine güvenle ulaşmasına yardımcı olun.',
      fullName: 'Ad Soyad',
      email: 'E-posta Adresi',
      password: 'Şifre',
      confirmPassword: 'Şifreyi Onayla',
      forgotPassword: 'Şifrenizi mi unuttunuz?',
      rememberMe: 'Beni bu tarayıcıda hatırla',
      alreadyHaveAccount: 'Zaten hesabınız var mı?',
      dontHaveAccount: 'Henüz hesabınız yok mu?',
      termsAgreement: 'Topluluk Kurallarını, Hizmet Şartlarını ve Gizlilik Politikasını kabul ediyorum',
      termsLink: 'Hizmet Şartları',
      privacyLink: 'Gizlilik Politikası',
      resetPasswordTitle: 'Şifre Kurtarma',
      resetPasswordSubtitle: 'Kurtarma talimatlarını almak için hesap e-postanızı girin.',
      sendResetLink: 'Kurtarma Kodu İste',
      enterToken: 'Kurtarma Kodu',
      newPassword: 'Yeni Şifre',
      resetSuccess: 'Şifreniz başarıyla güncellendi. Şimdi giriş yapabilirsiniz.',
      passwordMinLength: 'Şifre en az 6 karakter olmalıdır.',
      passwordsDoNotMatch: 'Şifreler birbiriyle eşleşmiyor.',
      loginSuccess: 'Başarıyla giriş yapıldı.',
      registerSuccess: 'Hesabınız başarıyla oluşturuldu.',
    },
    feed: {
      allReports: 'Tüm Eşyalar',
      lostFeed: 'Kayıp Eşyalar',
      foundFeed: 'Bulunan Eşyalar',
      resolvedFeed: 'Sahibine Ulaşanlar',
      searchPlaceholder: 'Kelime, eşya modeli veya konum ile arayın...',
      cityFilter: 'Şehir veya bölgeye göre filtrele',
      allCategories: 'Tüm Kategoriler',
      sortNewest: 'En Yeniler',
      sortOldest: 'En Eskiler',
      sortMostViewed: 'En Çok Görüntülenen',
      reportCount: 'ilan topluluk kayıtlarında yer alıyor',
      emptyTitle: 'Henüz topluluk ilanı bulunmuyor',
      emptySubtitle: 'Çevrenizde kaybolan veya bulunan bir eşyayı ilk siz bildirin.',
      emptyAction: 'İlk İlanı Yayınla',
      noResultsTitle: 'Eşleşen ilan bulunamadı',
      noResultsSubtitle: 'Arama terimlerinizi değiştirmeyi veya filtreleri temizlemeyi deneyin.',
      clearFilters: 'Filtreleri Temizle',
      welcomeHeading: 'Kayıp eşyaları güven ve dayanışma ile sahiplerine kavuşturun',
      welcomeSubtitle: 'Findora, eşyalarını kaybedenlerle bulanları güvenli bir şekilde buluşturur. Gizli doğrulama detayı hassas bilgileri korur.',
      reuniteCount: 'eşya güvenle sahibine ulaştırıldı',
      howItWorks: 'Findora Nasıl Çalışır?',
      step1Title: '1. İlan Verin',
      step1Desc: 'Eşyayı tanımlayın ve gerçek sahiplik doğrulaması için gizli bir detay belirleyin.',
      step2Title: '2. Arayın & İletişime Geçin',
      step2Desc: 'İlanları inceleyin ve platform içinden doğrudan ve güvenli bir şekilde mesajlaşın.',
      step3Title: '3. Doğrulayın & Teslim Edin',
      step3Desc: 'Kamusal ve aydınlık bir alanda teslimat yapmadan önce sahiplik kanıtını teyit edin.',
    },
    categories: {
      phones_electronics: 'Telefon & Elektronik',
      wallets_money: 'Cüzdan & Para',
      keys: 'Anahtar & Anahtarlık',
      bags_luggage: 'Çanta & Valiz',
      documents_id: 'Belge & Kimlikler',
      jewelry_accessories: 'Takı & Saat',
      clothing: 'Giyim & Kıyafet',
      pets: 'Evcil Hayvanlar',
      books_school: 'Kitap & Okul Eşyaları',
      vehicles_bikes: 'Taşıt & Bisiklet',
      other: 'Diğer Eşyalar',
    },
    reportForm: {
      titleLost: 'Kayıp Eşya Bildir',
      titleFound: 'Bulunan Eşya Bildir',
      typePrompt: 'Hangi türde bir ilan yayınlamak istiyorsunuz?',
      itemLost: 'Bir Eşya Kaybettim',
      itemFound: 'Bir Eşya Buldum',
      itemTitle: 'İlan Başlığı',
      itemTitlePlaceholder: 'Örn: İçinde öğrenci kartı olan siyah deri cüzdan',
      category: 'Kategori',
      selectCategory: 'Kategori seçin',
      description: 'Detaylı Açıklama',
      descriptionPlaceholder: 'Fiziksel özellikler, marka, renk, yaklaşık bölge ve durum bilgisi...',
      city: 'Şehir veya Bölge',
      cityPlaceholder: 'Örn: İstanbul, Ankara, İzmir, Erbil, Bağdat...',
      location: 'Yaklaşık Konum',
      locationPlaceholder: 'Örn: Merkez kütüphane veya metro durağı civarı',
      date: 'Kayıp veya Bulunma Tarihi',
      uploadPhoto: 'Eşya Fotoğrafı',
      uploadPhotoHint: 'Net ve anlaşılır bir fotoğraf yükleyin (JPEG, PNG, maks 5MB)',
      secretDetail: 'Gizli Doğrulama Detayı (Önerilir)',
      secretDetailHint: 'Yalnızca sizin bildiğiniz ayırt edici bir detay (ekran duvar kağıdı, özel çizik, seri no sonu vb.). Kamuya gizli tutulur, sadece gerçek sahibi teyit etmek için kullanılır.',
      secretDetailWarning: 'Lütfen banka kartı numarası, şifre veya açık ev adresi yazmayınız.',
      contactPreference: 'Güvenli İletişim Tercihi',
      contactInApp: 'Uygulama İçi Güvenli Mesajlaşma (Önerilir)',
      contactEmail: 'Uygulama içi sahiplik taleplerine izin ver',
      preferredLanguage: 'İlanın Tercih Edilen Dili',
      submitReport: 'İlanı Yayınla',
      updateReport: 'Değişiklikleri Kaydet',
      safetyNotice: 'Güvenliğiniz için tam kimlik numarası veya banka hesap detaylarını asla paylaşmayın.',
    },
    reportDetail: {
      lostOn: 'Kaybolma tarihi:',
      foundOn: 'Bulunma tarihi:',
      locationAt: 'Konum:',
      reportedBy: 'Yayınlayan:',
      memberSince: 'Katılım tarihi:',
      statusOpen: 'Aktif',
      statusMatched: 'Talep İnceleniyor',
      statusResolved: 'Sahibine Ulaştı & Çözüldü',
      statusClosed: 'Kapandı',
      views: 'görüntülenme',
      share: 'İlanı Paylaş',
      bookmark: 'Kaydet',
      like: 'Destekle',
      reportItem: 'Şüpheli İlanı Bildir',
      contactFinder: 'Bulan Kişiye Mesaj Gönder',
      contactOwner: 'Eşya Sahibine Mesaj Gönder',
      claimItem: 'Bu Eşya Benim (Sahiplik Talebi)',
      secretDetailTitle: 'Sizin Belirlediğiniz Gizli Doğrulama Detayı',
      secretDetailDesc: 'Bu bilgiyi yalnızca siz ve platform yöneticileri görebilir; gelen talepleri doğrulamak için kullanılır.',
      commentsTitle: 'Topluluk Yorumları ve İpuçları',
      noComments: 'Henüz yorum yapılmamış. Bu eşyayla ilgili bir bilginiz var mı? Aşağıdan paylaşın.',
      addCommentPlaceholder: 'Yardımcı bir ipucu veya yorum yazın...',
      postComment: 'Yorumu Gönder',
      deleteReportConfirm: 'Bu ilanı kalıcı olarak silmek istediğinizden emin misiniz?',
      markAsResolved: 'Sahibine Ulaştı Olarak İşaretle',
      editReport: 'İlanı Düzenle',
    },
    claims: {
      modalTitle: 'Sahiplik Talebi ve Kanıt Gönder',
      explanationLabel: 'Bu eşyanın size ait olduğunu nasıl kanıtlarsınız?',
      explanationPlaceholder: 'Fotoğrafta görünmeyen belirgin işaretler, renkler, iç bölmeler veya ayırt edici özellikleri açıklayın...',
      evidenceLabel: 'Destekleyici Kanıt Detayları',
      evidencePlaceholder: 'Örn: Satın alma tarihi, fatura detayı, belirgin çizik, benzersiz sembol...',
      submitClaim: 'Gizli Talebi Gönder',
      claimsForReport: 'Bu İlan İçin Gelen Sahiplik Talepleri',
      noClaimsYet: 'Henüz bir sahiplik talebi gönderilmemiş.',
      statusPending: 'Beklemede',
      statusReview: 'İnceleniyor',
      statusAccepted: 'Onaylandı & Doğrulandı',
      statusRejected: 'Reddedildi',
      statusWithdrawn: 'Geri Çekildi',
      acceptClaim: 'Talebi Kabul Et ve Çözüldü Yap',
      rejectClaim: 'Talebi Reddet',
      reviewClaim: 'İncelemeye Al',
      myClaimsTitle: 'Gönderdiğim Sahiplik Talepleri',
      claimAcceptedNotice: 'Talebiniz kabul edildi! Eşyayı güvenle teslim almak için kamusal bir alanda buluşmak üzere mesajlaşın.',
      claimRejectedNotice: 'Bu talep ilan sahibi tarafından reddedildi.',
    },
    messages: {
      inboxTitle: 'Doğrudan Mesajlar',
      noConversations: 'Henüz aktif bir sohbetiniz bulunmuyor.',
      selectConversation: 'Mesajlaşmaya başlamak için listeden bir sohbet seçin.',
      typeMessage: 'Güvenli bir mesaj yazın...',
      sendMessage: 'Gönder',
      safetyReminder: 'Güvenlik İpucu: Her zaman aydınlık ve kamusal alanlarda (istasyonlar, meydanlar) buluşun. Asla para transferi veya şifre göndermeyin.',
      aboutItem: 'İlgili Eşya:',
    },
    notifications: {
      title: 'Bildirimler',
      markAllRead: 'Tümünü okundu işaretle',
      noNotifications: 'Henüz yeni bir bildiriminiz yok.',
    },
    profile: {
      myReports: 'İlanlarım',
      savedReports: 'Kaydedilen İlanlar',
      myClaims: 'Sahiplik Taleplerim',
      reportsPublished: 'Yayınlanan İlan',
      itemsResolved: 'Kavuşturulan Eşya',
      editProfile: 'Profili Düzenle',
      bioPlaceholder: 'Kendiniz hakkında kısa bir bilgi yazın...',
      cityPlaceholder: 'Şehriniz veya bölgeniz...',
      saveProfile: 'Profili Kaydet',
    },
    settings: {
      title: 'Hesap Ayarları',
      interfaceLanguage: 'Arayüz Dili',
      themeMode: 'Görünüm Teması',
      themeLight: 'Açık Tema',
      themeDark: 'Koyu Tema',
      themeSystem: 'Sistem Tercihine Uy',
      changePassword: 'Şifre Değiştir',
      currentPassword: 'Mevcut Şifre',
      newPassword: 'Yeni Şifre (en az 6 karakter)',
      exportData: 'Kişisel Verileri Dışa Aktar',
      exportDesc: 'İlanlarınız, yorumlarınız, talepleriniz ve mesajlarınızın eksiksiz bir JSON kopyasını indirin.',
      downloadExport: 'JSON Verisini İndir',
      deleteAccount: 'Hesabı Kalıcı Olarak Sil',
      deleteAccountDesc: 'Hesabınızı ve ilişkili tüm kişisel verilerinizi Findora sisteminden kalıcı olarak kaldırın.',
      deleteAccountConfirm: 'Hesabınızı kalıcı olarak silmek istediğinizden kesinlikle emin misiniz? Bu işlem geri alınamaz.',
    },
    admin: {
      dashboardTitle: 'Yönetim ve Güvenlik Merkezi',
      totalUsers: 'Toplam Kullanıcı',
      totalReports: 'Toplam İlan',
      lostItems: 'Kayıp İlanı',
      foundItems: 'Buluntu İlanı',
      resolvedItems: 'Kavuşturulan Eşyalar',
      flaggedReports: 'İncelenecek Şikayetler',
      moderationQueue: 'Moderasyon Sırası',
      auditLogs: 'Denetim Günlüğü',
      noFlaggedContent: 'Şu anda sırada bekleyen şikayet bulunmuyor.',
      reason: 'Neden',
      reportedBy: 'Şikayet Eden',
      actionDismiss: 'Şikayeti Yoksay',
      actionReview: 'İncelendi Olarak İşaretle',
      actionBanUser: 'Kullanıcıyı Askıya Al',
      actionDeletePost: 'İçeriği Sil',
      actionUnsuspend: 'Askıyı Kaldır',
      notesPlaceholder: 'Moderatör notları...',
    },
    safety: {
      reportModalTitle: 'Uygunsuz İçeriği Bildir',
      selectReason: 'Lütfen bir neden seçin',
      reasonFraud: 'Dolandırıcılık veya Sahtekarlık Şüphesi',
      reasonInappropriate: 'Uygunsuz veya Saldırgan İçerik',
      reasonHarassment: 'Taciz veya Kimlik Taklidi',
      reasonSpam: 'Spam veya İstenmeyen Reklam',
      reasonOther: 'Diğer Topluluk Kuralı İhlali',
      detailsLabel: 'Ek Detaylar',
      detailsPlaceholder: 'Moderasyon ekibimiz için açıklama yapın...',
      blockUser: 'Kullanıcıyı Engelle',
      blockConfirm: 'Bu kullanıcının size mesaj atmasını veya ilanlarınızı görmesini engellemek istiyor musunuz?',
      communityGuidelinesTitle: 'Findora Topluluk Güvenlik İlkeleri',
    },
  },
};
