class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.intervalId;
    this.timeComponentsRef = document.querySelectorAll(`${selector} .value`);
    this.init();
  }
  countTimeComponents(curDate) {
    const days = this.pad(
      Math.floor((this.targetDate - curDate) / (1000 * 60 * 60 * 24))
    );
    const hours = this.pad(
      Math.floor(
        ((this.targetDate - curDate) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
    );
    const mins = this.pad(
      Math.floor(((this.targetDate - curDate) % (1000 * 60 * 60)) / (1000 * 60))
    );
    const secs = this.pad(
      Math.floor(((this.targetDate - curDate) % (1000 * 60)) / 1000)
    );
    return [days, hours, mins, secs];
  }
  init() {
    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const countdownDate = this.countTimeComponents(currentDate);
      if (countdownDate.every((timeEl) => timeEl < 0)) {
        clearInterval(this.intervalId);
        return;
      }
      this.updateTimer(countdownDate);
    }, 1000);
  }
  updateTimer(countdownDate) {
    [...this.timeComponentsRef].reduce(function (prevValue, curValue, index) {
      curValue.textContent = countdownDate[index];
    }, this.timeComponentsRef[0]);
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
}
const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Oct 10, 2022 20:32:30"),
});
