export class NavUtilities {
    static siteConfig = {
        name: 'InstaDrive',
        nav: [
          { name: 'Home', href: '/'  /* Always include the home at the top (Zeroth index) */},
          { name: 'About Us', href: '/about' },
          { name: 'Services', href: '#' },
          { name: 'Claims', href: '/user/user-profile' },
          { name: 'Contact', href: '#' }
        ],
        socialLinks: [
          { name: 'Instagram', href: 'https://instagram.com/yourprofile' },
          { name: 'Slack', href: 'https://slack.com/yourworkspace' }
        ]
      };
}