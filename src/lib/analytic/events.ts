export type Event = {
  event: string;
  centValue?: number;
};

export const events: { [eventName: string]: Event } = {
  // Check if user clicked toggle dark mode button
  DarkMode_Enabled: {
    event: '6ZNRDXMO',
    centValue: 10, // Simulate cent value
  },
  DarkMode_Disabled: {
    event: 'G3ERIPBN',
    centValue: 10,
  },
  OpenGithubRepo: {
    event: 'C96TPNHN',
  },
};
