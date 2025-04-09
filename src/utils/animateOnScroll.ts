
export const animateOnScroll = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1
  });

  reveals.forEach(element => {
    observer.observe(element);
  });
  
  return () => {
    reveals.forEach(element => {
      observer.unobserve(element);
    });
  };
};
