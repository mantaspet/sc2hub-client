<template>
  <div class="narrow-page-wrapper p-4">
    <h1 id="about-features" class="text-xl">About SC2Hub</h1>
    <div class="pb-8 pt-4 border-b">
      <p class="mb-4">
        SC2Hub is a hobby project I've started to make it easy to follow SC2
        esports scene while avoiding spoilers, on both desktop and mobile
        devices. I tend to watch events like GSL after they have happened, and
        it's difficult to avoid spoiling the experience when the latest video on
        AfreecaTV Youtube channel includes finalist names in the title.
      </p>
      <p class="mb-4">
        SC2Hub requires minimal administration efforts as the only data that
        needs to be manually entered are the event categories (e.g. GSL, ESL)
        and the channels where those events are livestreamed or/and where you
        can find their videos. The rest the server does on it's own,
        periodically checking
        <a href="https://twitch.net" class="link" target="_blank">Twitch</a> and
        <a href="https://youtube.come" class="link" target="_blank">Youtube</a>
        for any new videos,
        <a href="https://tl.net" class="link" target="_blank">TL.net</a> for
        news and calendar events,
        <a href="https://starcraft2.com" class="link" target="_blank"
          >starcraft2.com</a
        >
        for news and
        <a
          href="https://liquipedia.net/starcraft2/Players_(Korea)"
          target="_blank"
          class="link"
          >Liquipedia</a
        >
        for players list (so their names can be hidden from titles when spoilers
        are disabled).
      </p>
      <p class="mb-4">
        There is no user tracking nor ads here and you can access all the
        current and upcoming features free of charge and without signing up for
        anything.
      </p>
      <p class="mb-4">
        This is not a commercial project, nor do I have any plans of turning it
        into one. Running it does have some small costs (€5 a month for hosting,
        €12 a year for domain name, €60 a year for Goland IDE) so if by any
        chance you'd want to support this project you can do so
        <a
          href="https://www.buymeacoffee.com/sc2hub"
          target="_blank"
          class="link"
          >here</a
        >. Completely optional, but very much appreciated!
      </p>
      <p class="mb-4">
        I would be very interested in finding out what you think about this
        project! You can reach me by sending an email to
        <a href="mailto:sc2hub@icloud.com" class="link">sc2hub@icloud.com</a> (I
        promise not to share your email with anyone nor send you any kinds of
        spam). I'd love to read any suggestions or comments you might have!
      </p>
      <p class="mb-4">
        If enough people find this type of project useful, I'd love to consider
        expanding to other games, especially the one that
        <a href="https://www.frostgiant.com/" target="_blank" class="link"
          >Frost Giant studios</a
        >
        are making.
      </p>
      <p>Thank you for visiting SC2Hub, I hope you will enjoy it!</p>
    </div>

    <h2 id="planned-features" class="pt-8 text-xl">Planned features</h2>
    <ul class="py-4 list-disc">
      <li class="pb-2">More filters and sorting options.</li>
      <li class="pb-2">Replace "Load more" buttons with infinite scrolling.</li>
      <li class="pb-2">
        Track more events and give users an option to hide the ones they are not
        interested in.
      </li>
      <li class="pb-2">Upcoming events section in home page.</li>
      <li class="pb-2">
        Content creators/SC2 resources list with tags, links to their
        socials/channels/blogs etc., filters, randomized order on every page
        visit, with user suggestions.
      </li>
      <li class="pb-2">
        Contact form with optional anonymity, for people who would rather not
        share their email address with a stranger on the internet.
      </li>
      <li class="pb-2">Dark theme.</li>
      <li class="pb-2">
        Optional signup/login for things like settings, continue watching sync
        and potentially more features like "must watch" video voting.
      </li>
      <li class="pb-2">
        Your suggestion? Send it to
        <a href="mailto:sc2hub@icloud.com" class="link">sc2hub@icloud.com</a>!
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Information',
};
</script>

<style scoped></style>
