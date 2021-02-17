<template>
  <div class="narrow-page-wrapper p-4">
    <h1 id="about-features">About SC2Hub</h1>
    <div class="pb-8 pt-4 border-b">
      <p class="mb-4">
        SC2Hub is a hobby project I've started to make it easier to follow SC2
        esports scene. I love StarCraft II and want to see it do well, so I hope
        that this project could make it's esports scene and content creators be
        more easily discoverable.
      </p>
      <p class="mb-4">
        SC2Hub requires minimal administration efforts as the only data that
        needs to be entered are the event categories (e.g. GSL, ESL) and the
        channels where those events are livestreamed, where you can find their
        VoDs. The rest the server does on it's own, periodically checking
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
        for players list (so I can hide their names from titles when spoilers
        are disabled).
      </p>
      <p class="mb-4">
        There is no user tracking nor ads here and you can access all the
        current and upcoming features free of charge and without the need for
        signing up!
      </p>
      <p class="mb-4">
        I would be very interested in finding out what you think about this
        project! You can reach me by sending an email to
        <a href="mail:sc2hub@gmail.com" class="link">sc2hub@gmail.com</a> (I
        promise not to share your email with anyone nor spam it with any kinds
        of annoying stuff) or by filling out the contact form
        <nuxt-link class="link" to="/contact">here</nuxt-link>. I'd love to read
        any suggestions or comments you might have!
      </p>
      <p class="mb-4">
        This is not a commercial project, nor do I have any plans of turning it
        into one. I'm not even sure if you will find it useful! Having said
        that, running this project has some small costs (5 EUR a month for
        hosting, 12 EUR a year for domain name, 60 EUR a year for IDE (I just
        can't code without IntelliJ tools at this point), so if by any chance
        you'd want to support this project you can do so
        <a
          href="https://www.buymeacoffee.com/sc2hub"
          target="_blank"
          class="link"
          >here</a
        >. Completely optional, but very much appreciated!
      </p>
      <p class="mb-4">
        If people find this type of website useful, I'd love to consider
        expanding to other games such as Starcraft I, Warcraft III or whatever
        <a href="https://www.frostgiant.com/" target="_blank" class="link"
          >Frost Giant studios</a
        >
        are brewing!
      </p>
      <p>Thank you for visiting SC2Hub, I hope you will enjoy it!</p>
    </div>

    <h1 id="planned-features" class="pt-8">Planned features</h1>
    <ul class="py-4">
      <li>Dark theme</li>
      <li>
        "Must watch" voting (votes tracked by IP address to prevent/reduce
        spamming)
      </li>
      <li>Your suggestion?</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Information',
};
</script>

<style scoped></style>
