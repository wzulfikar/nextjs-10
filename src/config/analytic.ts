export const events = {
  // Check if user clicked toggle dark mode button
  DarkMode_Enabled: {
    event: '6ZNRDXMO',
    centValue: 10, // Simulate cent value
  },
  DarkMode_Disabled: {
    event: 'G3ERIPBN',
    centValue: 10,
  },
  LandingPage_OpenGithubRepo: {
    event: 'C96TPNHN',
  },
  Preview_ClickOpenInGithub: {
    event: 'HU1MBMKU',
  },
  Preview_ClickBackToHome: {
    event: '4PL0UQJO',
  },
  Preview_GridCell_ClickOpenDocsSite: {
    event: 'YXEC1CFI',
  },
  Preview_GridCell_ClickOpenInGithub: {
    event: 'XDGII22Y',
  },

  // Track checkout process
  StripePreview_ClickCheckout: {
    event: 'P8KTQRJY',
  },
  StripePreview_PaymentSuccessful: {
    event: 'DRFURCVI',
  },
  StripePreview_PaymentFailed: {
    event: '33F0HCOC',
  },
  StripePreview_ClickManageSubscription: {
    event: 'VKBNYD6J',
  },
};

export default { events };
